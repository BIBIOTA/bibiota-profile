# Article Review Report

## Article Path

`docs/tech/posts/2026-06-23-slow-query.md`

## Review Status

**PASSED** — No fixes required. Article is ready to publish.

## Checks Performed

### Frontmatter
- [x] `layout: doc` present
- [x] `title` matches confirmed metadata
- [x] `description` matches confirmed metadata
- [x] `date: 2026-06-23` correct
- [x] `avatar: /daily-questions-challenge.png` correct
- [x] `tags: [Database, Backend]` match metadata
- [x] `og:title` consistent with title
- [x] `og:description` consistent with description
- [x] `twitter:title` consistent with title
- [x] `twitter:description` consistent with description

### VitePress Components
- [x] `ArticleTitle` imported and rendered
- [x] `ScrollToTopBtn` imported and rendered

### Daily Questions Challenge Rules
- [x] Title uses `[Daily Questions Challenge 29]` format
- [x] Avatar is `/daily-questions-challenge.png`
- [x] Pinned index updated under `### Database` in `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md`

### Article Structure
- [x] Problem context (慢查詢的影響)
- [x] Core concept + tools (Slow Query Log, EXPLAIN, EXPLAIN ANALYZE)
- [x] How it works (type / rows / Extra 欄位解讀)
- [x] Practical scenarios and trade-offs (5 種常見原因 + 優化手段總表 + 排查流程)
- [x] Summary (總結)
- [x] References (## 參考)

### Content Accuracy
- [x] Slow Query Log 參數正確：`slow_query_log`, `long_query_time`, `log_queries_not_using_indexes`
- [x] `mysqldumpslow` 旗標正確：`-s t`（總時間）、`-s at`（平均時間）、`-t N`（Top N）
- [x] EXPLAIN `type` 欄位值排序正確（const → ref → range → index → ALL）
- [x] EXPLAIN ANALYZE 版本正確：MySQL 8.0.18+，輸出格式為 TREE
- [x] `actual time=first..last` 說明正確（第一列時間..最後一列時間）
- [x] Index 失效情境（函數包欄位、LIKE `%`、型別不符）正確
- [x] N+1 Query 說明與範例正確
- [x] Keyset Pagination 範例邏輯正確

### Grammar and Formatting
- [x] Traditional Chinese 標點符號使用正確（全形逗號、句號）
- [x] 英文技術術語有中文對照說明
- [x] Markdown 標題層級無跳層（## → ### 無遺漏）
- [x] 表格格式正確
- [x] 程式碼區塊語言標記完整（sql、bash、ini）
- [x] 無多餘空行或格式異常

### References
- [x] 6 條參考來源，格式為 `- [Title](URL)`
- [x] 全部使用 MySQL 官方文件、Percona、PlanetScale 等可信來源

## Fixes Applied

無。

## Issues Requiring User Decision

無。

## Recommended Next Step

執行 `npm run docs:build` 做建置驗證，確認 VitePress 無編譯錯誤後準備 commit。
