## Why
部落格技術文章數量已超過 40 篇並持續成長，讀者目前只能靠分頁逐頁瀏覽，無法以關鍵字快速找到特定主題的文章。既有列表頁（`TechArticleList.vue`）僅提供分頁，缺乏搜尋能力；文章資料也只暴露摘要（excerpt），無法比對到埋在內文深處的關鍵字。

## What Changes
- **blog-search**: 在既有 Blog 列表頁內嵌搜尋欄，讀者輸入關鍵字即可即時篩選技術文章，比對範圍涵蓋標題、描述與完整內文。
- **blog-search**: 於 build/dev 時期產生純文字化的搜尋索引 `docs/public/tech-search-index.json`，前端在首次使用搜尋時延遲載入，避免影響一般頁面載入效能。
- **blog-search**: 搜尋採大小寫無關子字串比對（適合中文 CJK 無空白斷詞特性），過濾結果沿用既有 `ArticleBox` 與 `Pagination`。

## Impact
- Affected specs: `specs/blog-search/`
- Affected code:
  - `docs/.vitepress/loadData.js`（新增 `stripMarkdown()`、`getTechSearchIndex()`）
  - `docs/.vitepress/config.js`（新增 Vite `buildStart` 外掛寫出索引）
  - `docs/.vitepress/theme/TechArticleList.vue`（新增搜尋欄與過濾邏輯）
  - `docs/public/tech-search-index.json`（build 產出物）
  - `tests/unit/`（新增/擴充測試）
- Breaking changes: No。搜尋為漸進增強，關鍵字為空時列表行為與現況完全一致。

## Related Artifacts
### Design
- [design.md](./design.md)
- [tasks.md](./tasks.md)
