# Article Review Report

## Article Path

`docs/tech/posts/2026-06-25-sharding-partitioning.md`

## Review Status

Passed — one mechanical fix applied.

## Checks Performed

### Frontmatter
- ✅ layout: doc
- ✅ title: "[Daily Questions Challenge 31] Sharding 與 Partitioning 策略"
- ✅ description 與 brief 一致
- ✅ date: 2026-06-25
- ✅ avatar: /daily-questions-challenge.png（Daily Questions Challenge 規則）
- ✅ tags: Backend, Database, System Design

### Open Graph / Twitter Meta
- ✅ og:title = title
- ✅ og:description = description
- ✅ twitter:title = title
- ✅ twitter:description = description

### VitePress Components
- ✅ ArticleTitle imported 並使用
- ✅ ScrollToTopBtn imported 並使用

### Daily Questions Challenge 規則
- ✅ 標題包含 Challenge 31
- ✅ avatar: /daily-questions-challenge.png
- ✅ 已更新 docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md（Database 分類）

### 內容準確性
- ✅ Partitioning vs Sharding 概念區分正確（同節點 vs 跨節點）
- ✅ PostgreSQL 支援 Range、List、Hash 三種分區方式，與官方文件一致
- ✅ Hash Sharding 公式 `hash(key) % shard_count` 正確
- ✅ Consistent Hashing 作為 Hash Sharding 改善方案，說明正確
- ✅ Directory-based Sharding 優缺點（SPOF 風險）說明正確
- ✅ Cross-Shard 挑戰（Fan-out、JOIN、Distributed Transaction、聚合排序）說明正確
- ✅ Hotspot 原因與處理方式正確
- ✅ 與讀寫分離（#17）的差異說明正確，兩者可同時使用的說明正確

### 文法與標點
- ✅ 繁體中文，無明顯錯字
- ✅ 英文術語括號標注一致（如 `Hotspot（熱點）`、`Fan-out 查詢`）
- ✅ 段落簡短，具體舉例

### Markdown 格式
- ✅ 標題層級一致，無跳層（## → ###）
- ✅ 策略比較使用表格
- ✅ 架構說明使用 mermaid 圖
- ✅ 程式碼使用 code block

### 參考資料
- ✅ 包含 `## 參考` 章節
- ✅ 使用 bullet 格式
- ✅ 來源包含 PostgreSQL 官方文件、PlanetScale、Microsoft Azure、Aerospike、DataCamp

## Fixes Applied

1. **mermaid 節點標籤移除 `\n`**：原始圖中 `[(Shard 1\nUser ID 1–3M)]` 使用 `\n` 換行，現有文章的 mermaid 圖均不使用此方式，可能導致渲染異常。已簡化為 `[(Shard 1)]`，與其他 Shard 節點一致。

## Issues Requiring User Decision

無。

## Recommended Next Command

執行 `npm run docs:build` 做建置驗證，或直接 commit。
