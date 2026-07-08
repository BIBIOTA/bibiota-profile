# Article Brief — RAG 架構設計

## Working Topic

RAG (Retrieval-Augmented Generation) 架構設計：LLM 如何存取外部資料。

## Confirmed Article Type

Daily Questions Challenge 技術文章（第 23 篇，AI Engineering 分類）。

## Intended Reader

正在準備後端 / AI Engineer 面試的軟體工程師。已具備基本 LLM API 串接經驗（讀過第 21、22 篇），想理解 LLM 應用如何處理「模型不知道的資料」。

## Article Purpose

回答面試常見問題「什麼是 RAG？為什麼要用 RAG？」。讓讀者能在面試中清楚說明：

- RAG 解決什麼問題（LLM 知識截止 / 幻覺 / 私有資料無法進入訓練集）
- Retrieval + Generation 兩階段架構的核心流程
- Embedding、Vector Database、Chunking 的基本概念與角色
- 為何選擇 RAG 而不是 Fine-tuning

## Core Question

「為什麼 LLM 應用需要 RAG？它的基本架構是什麼？」

## Scope

- RAG 動機：LLM 知識截止 / 幻覺 / 私有資料三大限制
- 兩階段架構：Retrieval（檢索）+ Augmented Generation（增強生成）
- 核心元件介紹：
  - Embedding（向量化）：把文字轉成向量的概念
  - Vector Database：用於相似度搜尋（cosine similarity 等）
  - Chunking 策略：固定長度、依語意、依結構切分的基本取捨
- 完整流程：Indexing 階段（離線）+ Query 階段（線上）的兩條路徑
- RAG vs Fine-tuning 的取捨（更新頻率、成本、可追溯性）

## Non-goals

- 不深入 Hybrid Search（關鍵字 + 語意搜尋）、Reranker 等進階檢索技巧
- 不涵蓋具體的 Embedding 模型比較或 Vector DB 選型細節
- 不提供完整可執行的程式碼範例（保持概念導向，符合系列前幾篇的形式）
- 不涉及 Context Window 管理或對話記憶（留給下一篇）
- 不涉及 Tool Use / Function Calling（留給後續文章）

## Suggested Category in Daily Questions Challenge Index

`### AI Engineering`（與第 20 篇 Harness Engineering、第 21 篇 Prompt Design、第 22 篇 LLM API 串接同類別）

## Notes from Similar Existing Posts

- 第 21 篇（LLM Prompt Design）與第 22 篇（LLM API 串接與處理）已建立 LLM 系列的「Prompt → API → 架構」進程，本篇承接第 22 篇結尾的明確預告：「下一篇將往更上層的架構設計邁進：當 LLM 需要存取外部資料、記憶對話歷史、或呼叫外部工具時，系統架構該如何設計——也就是 RAG、Context 管理與 Tool Use 的核心概念。」
- 第 22 篇結尾承諾涵蓋 RAG / Context / Tool Use 三者，但合在一篇會過大；本篇先聚焦 RAG，Context 管理與 Tool Use 留給後續兩篇。
- 寫作形式參考第 22 篇：以「概念解釋為主、附少量 pseudo-code 或結構示意」，避免完整可執行範例堆疊。
- 文章結尾應預告下一篇主題（Context Window / 對話記憶管理），維持系列連貫性。
- 風格須遵循 `blog-style-guide.md`：實用清晰，英文術語用括號標註（例如「向量資料庫（Vector Database）」），避免誇張或勵志語言。
