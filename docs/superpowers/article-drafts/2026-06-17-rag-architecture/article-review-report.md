# Article Review Report — RAG 架構設計

## Article Path

`docs/tech/posts/2026-06-17-rag-architecture.md`

## Review Status

**passed**（無機械修正項目；可進入建置驗證或 commit。）

## Checks Performed

### Frontmatter

- [x] `layout: doc`
- [x] `title` 與 metadata 一致
- [x] `description` 與 metadata 一致
- [x] `date: 2026-06-17` 與 metadata 一致
- [x] `avatar: /daily-questions-challenge.png`（Daily Questions Challenge 用）
- [x] `tags: AI, LLM, RAG`
- [x] `head` 包含 og:title、og:description、twitter:title、twitter:description 四項，文字與 frontmatter 一致

### Imports & Components

- [x] `ArticleTitle` 已 import 並 render
- [x] `ScrollToTopBtn` 已 import 並 render

### Markdown Formatting

- [x] H2 一致使用；僅在「RAG 的兩階段架構」下層使用 H3，與第 21 篇 (LLM Prompt Design) 用法一致
- [x] 表格欄位對齊
- [x] Code block 使用無語言標籤（純文字流程示意），與系列既有風格一致
- [x] List 與粗體使用適度，未過量

### 內容與觀念

- [x] Lewis et al. 2020 為 RAG 起源論文（NeurIPS 2020, arXiv:2005.11401）
- [x] RAG 兩階段架構（Indexing offline / Query online）流程正確
- [x] Embedding 描述（語意向量、跨語言、固定維度）正確
- [x] `text-embedding-3-small` 預設 1536 維正確
- [x] Cosine Similarity 值域 -1 ~ 1 與語意對應正確
- [x] HNSW 屬於 ANN 演算法，敘述正確
- [x] Chunking 三種策略（Fixed-size / Structure-based / Semantic）符合主流分類
- [x] RAG vs Fine-tuning 比較表內容與多份來源一致

### 標點與排版

- [x] 中文標點（、，；：「」）使用一致
- [x] 全形破折號 `——` 用法符合既有文章慣例
- [x] 英文技術詞首次出現以括號標註中譯（符合 style guide）

### 參考來源

- [x] `## 參考` 區段存在
- [x] 條列格式 `- [Title](URL)`
- [x] 包含原始論文 + IBM 概念文件 + 多份工程實務文章，符合 style guide「優先官方文件、原始論文、可信工程文章」

### Daily Questions Challenge

- [x] 標題前綴 `[Daily Questions Challenge 23]`，編號正確（前一篇為 22）
- [x] `avatar: /daily-questions-challenge.png`
- [x] 已新增至 `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md` 的 `### AI Engineering` 分類最末

### 系列連貫性

- [x] 開頭以 `[上一篇](/tech/posts/2026-06-16-llm-api-best-practices)` 承接第 22 篇
- [x] 結尾預告下一篇主題（Context Window 與對話記憶管理），與第 22 篇文末對 RAG / Context / Tool Use 三題的整體規劃一致

## Fixes Applied

無。本次審閱未觸發任何機械修正。

## Notes（非阻塞）

- 文中以「Meta 研究團隊」描述 2020 年原始論文。嚴格而言 2020 年發表時公司名稱仍為 Facebook（2021 年 10 月才更名 Meta），但 2026 年公開資料多以「Meta」統稱該研究團隊歷史成果，且 IBM、研究機構等都採此寫法，可接受。如要更精確可改為「Meta（前 Facebook）研究團隊」，但屬於風格選擇，非錯誤，未自動修改。

## Issues Requiring User Decision

無。

## Recommended Next Command

```bash
npm run docs:build
```

確認 VitePress 建置通過後即可進入 commit 流程。
