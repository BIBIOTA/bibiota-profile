# Article Review Report

## Article Path

`docs/tech/posts/2026-06-20-rest-vs-graphql.md`

## Review Status

**PASSED** — 已套用 1 項機械修正，無待用戶決策事項。

---

## Checks Performed

### Frontmatter
- `layout: doc` ✓
- `title` 與 metadata 一致 ✓
- `description` 與 metadata 一致 ✓
- `date: 2026-06-20` ✓
- `avatar: /daily-questions-challenge.png` ✓（Daily Questions Challenge 規則）
- `tags`: Backend、API Design、REST、GraphQL、Interview ✓

### Open Graph & Twitter Meta
- `og:title` 與 `title` 一致 ✓
- `og:description` 與 `description` 一致 ✓
- `twitter:title` 與 `title` 一致 ✓
- `twitter:description` 與 `description` 一致 ✓

### VitePress Imports & Components
- `import ArticleTitle` ✓
- `import ScrollToTopBtn` ✓
- `<ArticleTitle />` ✓
- `<ScrollToTopBtn />` ✓

### Content Structure
- 開篇脈絡 ✓
- REST 說明（資源導向、HTTP 動詞、三大約束）✓
- GraphQL 說明（Field Selection、單一 endpoint、Schema）✓
- Over-fetching / Under-fetching 說明 ✓
- 核心對比表格 ✓
- 各自適用場景 ✓
- N+1 問題與 DataLoader 解法 ✓
- 選型原則總結 ✓

### Technical Accuracy
- REST：Roy Fielding 2000 年博士論文來源正確 ✓
- GraphQL：Facebook 2012 內部開發、2015 開源，正確 ✓
- HTTP 動詞對應 ✓
- N+1 問題機制描述正確 ✓
- DataLoader 批次合併說明正確 ✓
- BFF 模式說明適當 ✓
- GraphQL Subscription 透過 WebSocket 正確 ✓

### References
- `## 參考` 標題 ✓
- 條列格式 `- [標題](URL)` ✓
- 6 筆參考，含 Fielding 原文、graphql.org 官方規格、Apollo 官方文件 ✓

### Daily Questions Challenge Rules
- 標題含 `[Daily Questions Challenge 26]` ✓
- Avatar `/daily-questions-challenge.png` ✓
- 置頂索引已更新，新增 `### API 設計` 分類 ✓
- 索引連結指向正確路徑 ✓

### Heading Levels
- 全部使用 `##`，無跳層 ✓

### Language & Style
- 繁體中文 ✓
- 英文技術術語附中文說明 ✓
- 短段落、具體範例 ✓

---

## Fixes Applied

| 項目 | 說明 |
|---|---|
| SQL 注釋語法 | 將 `// 原本：...` 和 `// DataLoader 批次：...` 改為 `--`，並加上 `sql` 語言標注，符合 SQL 標準注釋語法 |

---

## Issues Requiring User Decision

無。

---

## Notes

- `### API 設計` 分類置於 `### Database` 之後（原 metadata 說明為「置於 `### Backend` 之後」）。實際位置合理，無功能影響。
- 第一個程式碼區塊（REST endpoint 範例）未指定語言，為通用文字格式，符合現有慣例。

---

## Recommended Next Step

```
是否要執行 npm run docs:build 做網站建置驗證，或準備 commit？
```
