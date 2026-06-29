---
layout: doc
title: "[Daily Questions Challenge 35] Prompt Engineering vs RAG vs Fine-tuning：如何選擇 LLM 應用策略"
description: 比較 Prompt Engineering、RAG 與 Fine-tuning 三種 LLM 應用策略的本質差異、成本、適用場景與常見組合，提供決策框架協助工程師在實務中做出正確選擇。
date: 2026-06-29
avatar: /daily-questions-challenge.png
tags:
  - AI
  - LLM
  - Prompt Engineering
  - RAG
  - Fine-tuning
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 35] Prompt Engineering vs RAG vs Fine-tuning：如何選擇 LLM 應用策略"
  - - meta
    - property: og:description
      content: 比較 Prompt Engineering、RAG 與 Fine-tuning 三種 LLM 應用策略的本質差異、成本、適用場景與常見組合，提供決策框架協助工程師在實務中做出正確選擇。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 35] Prompt Engineering vs RAG vs Fine-tuning：如何選擇 LLM 應用策略"
  - - meta
    - name: twitter:description
      content: 比較 Prompt Engineering、RAG 與 Fine-tuning 三種 LLM 應用策略的本質差異、成本、適用場景與常見組合，提供決策框架協助工程師在實務中做出正確選擇。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

## 三種策略，一個共同問題

當工程師拿到一個基礎 LLM，準備打造 AI 應用時，很快會遇到同一個問題：**模型的輸出不夠符合需求**。

原因通常落在幾個方向：

- 模型不知道你的公司資料或最新資訊
- 模型的回應風格、格式不一致
- 模型在特定任務上的推理能力不足

面對這些問題，業界發展出三種主要策略：**Prompt Engineering**、**RAG（Retrieval-Augmented Generation）**、**Fine-tuning（微調）**。它們分別從不同層面切入，本篇的重點是幫助你理解「何時該用哪個」。

## 三種策略的定位

### Prompt Engineering（提示工程）

在不改變模型本身的前提下，透過精心設計輸入（System Prompt、Few-shot 範例、角色指令等）來引導模型產出更好的結果。

- 不需要訓練資料，不需要部署新模型
- 實作時間：數小時到數天
- 適合：格式調整、語氣控制、基本推理任務

詳細的 Prompt 設計技巧可參考本系列 [#21 如何設計 LLM Prompt](./2026-06-15-llm-prompt-design.md)。

### RAG（Retrieval-Augmented Generation）

在模型推論時，先從外部知識庫（向量資料庫、文件搜尋）撈取相關資料，再把這些資料拼入 Prompt 送給模型，讓模型基於這份即時資訊生成答案。

- 不改變模型權重，知識更新只需重新索引文件
- 基礎設施成本：Embedding 運算 + Vector DB（約 $10–$500 建置，$70–$1000/月維運）
- 適合：需要查詢公司內部文件、產品資料、最新資訊的場景

RAG 架構的深入說明可參考 [#23 RAG 架構設計](./2026-06-17-rag-architecture.md)。

### Fine-tuning（微調）

用標記好的領域資料集對預訓練模型進行再訓練，調整模型的權重，讓模型「內化」特定的行為模式或推理方式。

- 需要準備高品質訓練資料（通常至少數百筆以上）
- 需要 GPU 訓練資源，更新時須重新訓練
- 推論成本比 RAG 高（使用自訂模型，推論費用約為基礎 API 的 2–6 倍）
- 適合：需要特定語言風格一致性、複雜分類任務、高度專業化推理

## 成本與限制對比

| 面向 | Prompt Engineering | RAG | Fine-tuning |
|------|-------------------|-----|-------------|
| **實作時間** | 數小時到數天 | 數天到數週 | 數週到數月 |
| **成本** | 極低（API 費用） | 中等（基礎設施費用） | 高（訓練 + 推論費用） |
| **知識更新** | 即時（改 Prompt） | 即時（重新索引） | 慢（需重新訓練） |
| **維護負擔** | 極低 | 中等（管理 Pipeline） | 高（資料品質、MLOps） |
| **最大限制** | 無法注入新知識；長 Prompt 成本高 | 不改善推理能力 | 需大量訓練資料 |

## 決策框架

一個簡單的判斷起點是問：**「模型缺的是知識，還是行為？」**

**→ 缺的是知識（Facts Gap）**：模型沒有你的公司資料、產品文件、近期資訊 → 優先考慮 **RAG**

**→ 缺的是指令遵循（Instruction Gap）**：格式不對、語氣不符、輸出結構混亂 → 先用 **Prompt Engineering** 解決

**→ 缺的是行為可靠性（Behavior Gap）**：複雜分類失準、特定推理模式不穩定、需要一致的品牌語氣 → 考慮 **Fine-tuning**

更實際的決策流程如下：

**Step 1**：先做 Prompt Engineering。大多數格式和語氣問題可以在這一步解決，且成本最低。

**Step 2**：如果問題在於「模型不知道這些資訊」，加入 RAG。這比 Fine-tuning 快得多，且知識庫可以隨時更新。

**Step 3**：只有在以下情境才評估 Fine-tuning：
- 業務規則極其複雜，Prompt 已無法可靠地描述
- 高流量場景下，長 Few-shot Prompt 的 Token 成本已超過訓練成本
- 需要超過 95% 精準度的分類任務，且有足夠的標記資料

## 常見組合策略

三種策略並非互斥，生產環境中最常見的高效架構往往是**組合使用**：

**Prompt Engineering + RAG**：最常見的起點。用 Prompt 控制輸出格式和語氣，用 RAG 提供正確的知識來源。適合大多數企業知識問答、客服機器人場景。

**RAG + Fine-tuning**：先用 Fine-tuning 讓模型學會特定的推理方式或品牌語氣，再用 RAG 注入最新的事實性知識。適合需要同時兼顧「行為一致性」和「資訊即時性」的場景。

**三者並用**：完整的生產系統中，Prompt Engineering 定義基礎行為框架，RAG 提供動態知識，Fine-tuning 解決特定推理瓶頸。

## 總結

選擇策略時，建議按「投入成本由低到高」逐步升級：

1. **Prompt Engineering** 永遠是第一步，成本最低，效果立竿見影
2. **RAG** 解決「模型不知道」的問題，維護成本可接受
3. **Fine-tuning** 只在 Prompt Engineering 和 RAG 都無法解決問題時才動用

不確定的話，先問自己：「這個問題，能用 10 個 Few-shot 範例解決嗎？」如果可以，就不需要 Fine-tuning。

## 參考

- [RAG vs fine-tuning vs. prompt engineering - IBM](https://www.ibm.com/think/topics/rag-vs-fine-tuning-vs-prompt-engineering)
- [Fine-Tuning, RAG, or Prompt Engineering? LLM Decision Guide - Moveo.AI](https://moveo.ai/blog/fine-tuning-rag-or-prompt-engineering)
- [Fine-Tuning vs RAG vs Prompt Engineering Guide - The Data Scientist](https://thedatascientist.com/fine-tuning-rag-or-prompt-engineering/)
- [RAG vs. Fine-tuning vs. Prompt Engineering: The Complete Guide (2025) - Aakash Gupta](https://www.news.aakashg.com/p/rag-vs-fine-tuning-vs-prompt-engineering)
