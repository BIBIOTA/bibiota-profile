---
layout: doc
title: "[Daily Questions Challenge 22] LLM API 串接與處理"
description: 介紹串接 LLM API 時必須處理的生產環境情境，包含常見錯誤類型、Exponential Backoff Retry 策略、Streaming chunk 處理、Token 費用估算與 API Key 安全管理。
date: 2026-06-16
avatar: /daily-questions-challenge.png
tags:
  - AI
  - LLM
  - Backend
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 22] LLM API 串接與處理"
  - - meta
    - property: og:description
      content: 介紹串接 LLM API 時必須處理的生產環境情境，包含常見錯誤類型、Exponential Backoff Retry 策略、Streaming chunk 處理、Token 費用估算與 API Key 安全管理。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 22] LLM API 串接與處理"
  - - meta
    - name: twitter:description
      content: 介紹串接 LLM API 時必須處理的生產環境情境，包含常見錯誤類型、Exponential Backoff Retry 策略、Streaming chunk 處理、Token 費用估算與 API Key 安全管理。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

## 前言

[上一篇](/tech/posts/2026-06-15-llm-prompt-design)討論了如何設計穩定的 LLM Prompt。有了好的 Prompt 之後，下一個挑戰是在程式碼層面正確處理與 LLM API 的溝通。

LLM API 的行為與一般 REST API 不同：回應時間長、有 Token 用量限制、支援串流輸出，也比一般 API 更容易遇到各種暫時性錯誤。這些特性讓錯誤處理的設計比想像中更重要。

## 常見錯誤類型

串接 LLM API 時，以下幾種錯誤最常遇到：

| HTTP 狀態碼 | 錯誤類型 | 說明 |
|---|---|---|
| 429 | Rate Limit | 在一段時間內的請求數（RPM）或 Token 數（TPM）超過限制 |
| 408 / 504 | Timeout | 模型回應時間過長，連線逾時 |
| 400 | Content Filter | 輸入或輸出內容觸發安全過濾 |
| 500 / 503 | Server Error | API 提供商伺服器暫時性故障 |
| 401 | Authentication Error | API Key 無效或權限不足 |

面對這些錯誤，關鍵是先分類再處理：

- **可重試（Transient）**：429、500、503、Timeout——等待後重試有機會成功
- **不可重試（Permanent）**：400 Content Filter、401——重試沒有意義，應直接處理或回報

## Retry 策略：Exponential Backoff 與 Jitter

遇到可重試的錯誤時，最直覺的做法是立刻重試，但這樣很可能馬上再次觸發 Rate Limit。正確的做法是使用 **Exponential Backoff**（指數退讓）：每次重試的等待時間依指數成長，讓 API 提供商有時間恢復。

基本公式：

```
等待時間 = base_delay × 2^attempt
```

然而單純的 Exponential Backoff 有個問題：如果多個 client 同時失敗，它們會在相同時間點一起重試，造成**雷群問題（Thundering Herd）**，讓伺服器瞬間再次過載。解法是加入 **Jitter**（隨機抖動）：

```
等待時間 = base_delay × 2^attempt × (0.5 + random(0, 0.5))
```

Python 實作範例：

```python
import time
import random

def call_with_retry(fn, max_attempts=5, base_delay=1.0):
    for attempt in range(max_attempts):
        try:
            return fn()
        except RateLimitError:
            if attempt == max_attempts - 1:
                raise
            delay = base_delay * (2 ** attempt)
            sleep_time = delay * random.uniform(0.5, 1.0)
            time.sleep(sleep_time)
```

幾個實務注意事項：

- 設定最大重試次數（如 5 次），避免無限重試
- 設定最大等待時間上限（如 60 秒），避免等待時間過長
- Rate Limit 錯誤（429）通常 API 會在 response header 中提供 `retry-after`，可直接使用此值

## Streaming：Server-Sent Events 與 Chunk 處理

LLM 的回應通常需要幾秒甚至更長時間才能完成。如果等待完整回應再顯示，使用者體驗很差。這時候可以使用 **Streaming** 模式：API 透過 Server-Sent Events（SSE）將回應逐步傳回，讓前端可以即時顯示文字。

以 OpenAI SDK 為例，開啟 Streaming：

```python
from openai import OpenAI

client = OpenAI()

stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "請說明 Streaming 的原理"}],
    stream=True,
)

for chunk in stream:
    delta = chunk.choices[0].delta
    if delta.content:
        print(delta.content, end="", flush=True)
```

每個 `chunk` 代表一小段回應文字（delta），需要將它們串接起來才是完整內容。

Streaming 的實務注意事項：

- **中途錯誤處理**：Streaming 過程中也可能發生錯誤，需在 chunk 迴圈外加上 try/except
- **Token 計算**：Streaming 模式下，使用量通常在最後一個 chunk 回傳，可透過 `stream_options: {include_usage: true}` 取得
- **連線保活**：如果在自己的 Backend 代理 SSE 給前端，需定期傳送 heartbeat 避免連線被關閉
- **中止功能**：使用者可能中途取消，需實作中止 stream 的機制並清理資源

## Token 計算與費用估算

LLM API 的費用以 Token 計算，分別對輸入（Input）和輸出（Output）計費。一般來說，1 Token ≈ 英文 4 個字元，中文約 1–2 字。

費用計算公式：

```
費用 = (input_tokens / 1,000,000) × input_price
     + (output_tokens / 1,000,000) × output_price
```

實務上的建議：

- **事前估算**：發送請求前先計算 Prompt 的 Token 數，避免超出 Context Window 或預算
- **設定 `max_tokens`**：限制輸出長度，防止模型產生過長回應導致費用暴增
- **監控用量**：透過 API 提供商的 Dashboard 或 Usage API 追蹤實際費用
- **Cache 策略**：相同 Prompt 的回應可以快取，減少重複呼叫

OpenAI 官方提供 `tiktoken` 函式庫可在呼叫前計算 Token 數；Anthropic 的 Claude API 也在 response 的 `usage` 欄位回傳實際用量。

## API Key 管理與安全

API Key 是存取 LLM API 的憑證，外洩等同於費用被濫用或資料外洩。

基本安全原則：

- **不寫入程式碼**：API Key 必須透過環境變數（Environment Variables）或 Secret Manager 注入，不能直接寫在 source code 或 config 檔案中
- **不上傳到版本控制**：確認 `.env` 已加入 `.gitignore`
- **前後端分離**：不要在前端（瀏覽器）直接呼叫 LLM API，這樣 API Key 會暴露在網路請求中。應由 Backend 代理呼叫
- **最小權限**：部分 API 提供商支援建立有使用範圍限制的 Key，盡量使用最小權限的 Key
- **定期輪換**：建議定期更換 API Key，並在有洩漏疑慮時立即撤銷

## 總結

本篇介紹了在程式碼層面串接 LLM API 時，幾個關鍵的處理要點：

- **錯誤分類**：先區分可重試與不可重試的錯誤，才能做出正確的處理決策
- **Retry 策略**：使用 Exponential Backoff + Jitter，避免多個 client 同時重試造成雷群問題
- **Streaming**：透過 SSE 逐步傳回 chunk，改善使用者體驗，並處理中途錯誤與中止功能
- **費用管理**：事前估算 Token、設定 `max_tokens`，並監控實際用量
- **API Key 安全**：只存在環境變數中，絕不進入前端或版本控制

解決了「如何呼叫 API」的問題之後，下一篇將往更上層的架構設計邁進：當 LLM 需要存取外部資料、記憶對話歷史、或呼叫外部工具時，系統架構該如何設計——也就是 RAG、Context 管理與 Tool Use 的核心概念。

## 參考

- [Timeouts, retries and backoff with jitter - AWS Builder's Library](https://aws.amazon.com/builders/library/timeouts-retries-and-backoff-with-jitter/)
- [Handling LLM API Errors and Rate Limits - apxml.com](https://apxml.com/courses/prompt-engineering-llm-application-development/chapter-4-interacting-with-llm-apis/handling-api-errors-rate-limits)
- [LLM API Error Handling and Retry Patterns - Grizzly Peak Software](https://www.grizzlypeaksoftware.com/library/llm-api-error-handling-and-retry-patterns-bpk0jmvq)
- [Streaming AI Agents Responses with Server-Sent Events (SSE) - Medium](https://akanuragkumar.medium.com/streaming-ai-agents-responses-with-server-sent-events-sse-a-technical-case-study-f3ac855d0755)
- [LLM Token Counting and Cost Optimization - DEV Community](https://dev.to/ayinedjimi-consultants/llm-token-counting-and-cost-optimization-a-practical-guide-nb8)
