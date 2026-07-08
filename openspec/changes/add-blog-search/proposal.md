## Why
部落格技術文章數量已超過 40 篇並持續成長，讀者目前只能靠分頁逐頁瀏覽，無法以關鍵字快速找到特定主題的文章。既有列表頁（`TechArticleList.vue`）僅提供分頁，缺乏搜尋能力。

## What Changes
- **blog-search**: 在既有 Blog 列表頁內嵌搜尋欄，讀者輸入關鍵字即可即時篩選技術文章，比對範圍為標題與描述。
- **blog-search**: 搜尋直接篩選 client 端既有的 `theme.techPosts`，不需額外索引或網路請求。
- **blog-search**: 搜尋採大小寫無關子字串比對（適合中文 CJK 無空白斷詞特性），過濾結果沿用既有 `ArticleBox` 與 `Pagination`。

## Scope 變更
初版曾納入「完整內文」全文搜尋並為此建立建置期 JSON 索引；實測後發現內文搜尋結果與使用者預期落差過大，改為僅比對標題與描述。由於這兩個欄位 client 端已具備，全文索引基礎設施（`getTechSearchIndex` / `stripMarkdown` / `writeTechSearchIndex` 與 Vite `buildStart` 外掛）一併移除。

## Impact
- Affected specs: `specs/blog-search/`
- Affected code:
  - `docs/.vitepress/theme/TechArticleList.vue`（新增搜尋欄與過濾邏輯）
  - `docs/.vitepress/loadData.js`（移除 `stripMarkdown()`、`getTechSearchIndex()`、`writeTechSearchIndex()`）
  - `docs/.vitepress/config.js`（移除 Vite `buildStart` 索引外掛）
  - `.gitignore`（移除 `tech-search-index.json` 項目）
  - `tests/unit/`（新增/擴充測試）
- Breaking changes: No。搜尋為漸進增強，關鍵字為空時列表行為與現況完全一致。

## Related Artifacts
### Design
- [design.md](./design.md)
- [tasks.md](./tasks.md)
