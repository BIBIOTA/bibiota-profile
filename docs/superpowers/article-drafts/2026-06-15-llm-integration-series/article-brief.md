# Article Brief：LLM 串接實務指南 系列

## 系列概述

**Working topic**: LLM 串接要點——從不同層級認識串接上需要留意的事情  
**Article type**: Daily Questions Challenge（AI Engineering 分類）  
**Confirmed article count**: 4 篇

---

## 系列共通設定

**目標讀者**: 剛開始接觸 LLM 串接的後端工程師——知道 API 怎麼呼叫，但不確定生產環境該注意什麼  
**系列目的**: 讓讀者從 Prompt 到頁面，完整看懂「一個 LLM 功能」的各層實務注意事項  
**非目標**: 不涵蓋模型訓練、Fine-tuning、LLMOps 平台選型等進階主題

---

## 篇章規劃

### 篇 1 — Daily Questions Challenge #21

**文章標題（暫定）**: 設計穩定的 LLM Prompt：System Prompt 架構與最佳實踐  
**核心問題**: 怎麼寫 Prompt 才能讓 LLM 輸出穩定、可預測？  
**涵蓋範圍**:
- System prompt vs. user message 的職責分界
- 常見 System Prompt 結構（角色設定、輸出格式、限制條件）
- 結構化輸出（JSON mode / XML tag）的實務做法
- Temperature、Top-p 等生成參數對穩定性的影響
- Few-shot example 的使用時機與設計原則

**非目標**: 不深入 prompt injection 防禦、fine-tuning

---

### 篇 2 — Daily Questions Challenge #22

**文章標題（暫定）**: 呼叫 LLM API 的最佳實踐：錯誤處理、Retry 與 Streaming  
**核心問題**: 程式碼層面串接 LLM API，有哪些必須處理的情境？  
**涵蓋範圍**:
- LLM API 常見錯誤類型（Rate Limit、Timeout、Content Filter、Server Error）
- Retry 策略：Exponential Backoff 與 Jitter 實作
- Streaming（Server-Sent Events）呼叫方式與 chunk 處理
- Token 計算與費用估算的實務做法
- API Key 管理與安全注意事項

**非目標**: 不涵蓋各家 SDK 詳細比較（以概念為主，範例可使用 OpenAI SDK 語法示意）

---

### 篇 3 — Daily Questions Challenge #23

**文章標題（暫定）**: LLM 應用架構要點：RAG、Context 管理與 Tool Use  
**核心問題**: 要讓 LLM 融入應用系統，架構層面需要設計哪些機制？  
**涵蓋範圍**:
- Context Window 限制與管理策略（截斷、壓縮、召回）
- RAG（Retrieval-Augmented Generation）基本架構與適用場景
- Tool Use / Function Calling 的設計原則
- Memory 模式（短期 vs. 長期，session vs. 持久化）
- 多輪對話的歷史管理

**非目標**: 不涵蓋 Vector Database 選型、Embedding 模型比較

---

### 篇 4 — Daily Questions Challenge #24

**文章標題（暫定）**: 前端串接 LLM：Streaming 顯示、Loading 狀態與 UX 設計  
**核心問題**: 前端要正確呈現 LLM 的回應，需要處理哪些問題？  
**涵蓋範圍**:
- SSE（Server-Sent Events）在前端的接收與即時顯示
- Streaming 文字的 Markdown 漸進渲染
- Loading / Thinking 狀態的 UX 設計
- 錯誤狀態呈現（斷線、超時、內容過濾）
- 中止（Stop）功能的前後端實作方式

**非目標**: 不涵蓋 Web Component 框架選型、特定 UI 庫

---

## 現有相關文章備註

- [什麼是 Harness Engineering?](../../posts/2026-06-08-harness-engineering.md)：AI Engineering 分類的第一篇，這個系列是它的下游延伸，可以在系列文章中引用
- Daily Questions Challenge 最新編號：#20（資料庫正規化，2026-06-14），本系列從 #21 開始

## 置頂索引分類

所有 4 篇均加入 `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md` 的 **AI Engineering** 分類下。
