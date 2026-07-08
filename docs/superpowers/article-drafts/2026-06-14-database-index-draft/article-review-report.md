# Article Review Report

## Article Path

`docs/tech/posts/2026-06-13-database-index.md`

## Review Status

PASSED — 無需修改，可直接 commit。

## Checks Performed

### Frontmatter
- [x] `layout: doc` 存在
- [x] `title` 含正確 Challenge 編號 (#19)
- [x] `description` 完整
- [x] `date: 2026-06-13` 正確
- [x] `avatar: /daily-questions-challenge.png` 正確
- [x] `tags: [Database, Backend]` 正確

### Open Graph & Twitter Meta
- [x] `og:title` 與 `title` 一致
- [x] `og:description` 與 `description` 一致
- [x] `twitter:title` 與 `title` 一致
- [x] `twitter:description` 與 `description` 一致

### VitePress Components
- [x] `ArticleTitle` 已 import 且已使用
- [x] `ScrollToTopBtn` 已 import 且已使用

### Heading Structure
- [x] 所有章節使用 `##`（h2），無層級跳躍
- [x] 子段落（WHERE 條件、ORDER BY、JOIN 條件）使用粗體，不用 h3，符合既有文章慣例

### Technical Accuracy
- [x] Full Table Scan 說明正確（O(N) 逐列掃描）
- [x] B-Tree 結構描述正確（根節點 → 內部節點 → 葉節點）
- [x] log₂(10,000,000) ≈ 23 計算正確（7 × 3.322 ≈ 23.25）
- [x] PostgreSQL TID 說明正確
- [x] MySQL InnoDB Secondary Index 存放主鍵值，說明正確
- [x] ORDER BY 沿葉節點連結串列讀取，符合 B+ Tree 實作（PostgreSQL / InnoDB 均如此）
- [x] Index 失效情況（函數包欄位、LIKE 前綴萬用字元、型別不符、選擇性太低）皆正確
- [x] Index 成本（寫入開銷、儲存空間）說明正確

### Language & Style
- [x] 繁體中文，語氣實務清晰
- [x] 英文技術術語加括號說明（Full Table Scan、Leaf Node、Primary Key）
- [x] 段落短，具體情境（email 查詢、訂單查詢）
- [x] 面試導向收尾，符合 Daily Questions Challenge 慣例

### References
- [x] 6 筆來源，均為官方文件（PostgreSQL、MySQL）
- [x] 格式符合 `## 參考` 規範

### Daily Questions Challenge Index
- [x] `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md` 已在 `### Database` 分類下新增連結

## Fixes Applied

無。文章通過所有檢查，無需機械性修正。

## Issues Requiring User Decision

無。

## Recommended Next Step

執行 `npm run docs:build` 做網站建置驗證，或直接準備 commit。
