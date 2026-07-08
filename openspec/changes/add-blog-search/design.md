---
change_id: add-blog-search
doc_language: 繁體中文
---

# 設計：部落格文章搜尋功能

## 目標

在部落格新增以關鍵字搜尋技術文章的功能，比對範圍涵蓋 **標題（title）與描述（description）**。搜尋以列表頁內嵌即時篩選的方式呈現，全程在客戶端執行，符合本站靜態網站（VitePress）的架構。

## 範圍

- **涵蓋分類**：僅技術文章（`docs/tech/posts/`）。travel 與 running 暫不納入。
- **搜尋入口**：既有 Blog 列表頁（`docs/tech/index.md` → `TechArticleList.vue`）頂部內嵌搜尋欄，即時篩選下方列表。
- **比對欄位**：`title + description`。資料來源為 client 端既有的 `theme.techPosts`，不需額外建立或載入索引。
- **搜尋方式**：大小寫無關的子字串比對（針對中文 CJK 無空白斷詞的特性，子字串比對最準且零依賴）。

## 範圍變更紀錄

初版設計曾納入「完整內文」全文搜尋，並為此建立建置期 JSON 索引（`getTechSearchIndex` / `stripMarkdown` / `writeTechSearchIndex` 與 Vite `buildStart` 外掛），前端延遲 `fetch` 該索引。實測後發現內文搜尋的結果與使用者預期的文章類型差異過大，因此縮小比對範圍為 `title + description`。

由於 `title` 與 `description` 已存在於 client 端的 `theme.techPosts`，全文索引的整套基礎設施不再需要，一併移除，改為直接篩選 `theme.techPosts`。

## 方案選擇

採用 **直接篩選 client 端既有 `theme.techPosts` 的子字串比對** 方案。無額外網路請求、無 build 產出物。

比較過的替代方案：

- **獨立 JSON 全文索引 + 延遲載入**（初版方案）：為攜帶完整內文而建。縮小為 `title + description` 後，所需資料 client 端已具備，此基礎設施成為多餘負擔。捨棄。
- **MiniSearch / Fuse.js 全文函式庫**：可得排序與容錯，但這類函式庫以空白斷詞，中文需自訂 bigram 分詞器才有效，複雜度高、對中文效益有限。捨棄。
- **VitePress 內建 local search（`provider: 'local'`）**：免自建索引，但它是全域搜尋按鈕 + modal，與「列表頁內嵌即時篩選」的 UX 不符；且會索引全站（履歷/首頁/travel/running），本站又用自訂 `Layout.vue` 隱藏預設導覽列，整合會與現有設計衝突。捨棄。

## 架構

```
瀏覽器端（tech 列表頁）
──────────────────────
TechArticleList.vue
  ├ 搜尋輸入欄
  ├ query 狀態（含 ~200ms debounce）
  ├ 對 theme.techPosts 以 title + description 子字串比對
  └ 過濾結果沿用既有分頁 / ArticleBox
```

搜尋完全在 client 端進行，資料取自 VitePress 既有注入的 `theme.techPosts`，不涉及 build 期索引產生或任何網路請求。

## 元件

### `TechArticleList.vue`（擴充既有元件，不新增元件）

- **職責**：呈現搜尋欄並依關鍵字篩選文章列表。
- **狀態**：`query`（關鍵字）、`page`（分頁）。
- **行為**：
  - `query` 為空 → 顯示既有 `theme.techPosts`（維持現狀）。
  - `query` 有值 → 對 `theme.techPosts` 做 `title + description` 大小寫無關子字串比對；過濾結果沿用既有 `ArticleBox` 與 `Pagination`（過濾集也可分頁）。
  - 輸入加約 200ms debounce；關鍵字變動時分頁重設回第 1 頁。
- **重用**：沿用 `ArticleBox`、`Pagination`、`Title`，不新增元件。

## 資料流

1. 使用者進入 tech 列表頁 → VitePress 既有注入 `theme.techPosts`。
2. 使用者輸入關鍵字（debounce 後）→ 對 `theme.techPosts` 以 `title + description` 過濾 → 更新結果 → 分頁重設第 1 頁。
3. 清空關鍵字 → 回到原本 `theme.techPosts` 完整列表。

## 邊界情況與錯誤處理

- **無結果**：顯示「找不到符合的文章」空狀態。
- **關鍵字正規化**：前後去空白、`toLowerCase()`；空字串視為未搜尋。
- **搜尋狀態不寫入 URL**：維持簡單；既有 `?page=` 分頁在搜尋時運作於過濾集。
- **SSR 安全**：`window` 僅在 client（`mounted`）觸發，避免 SSR 期間執行。

## 測試

沿用既有 `tests/unit/` + vitest + `__mocks__/vitepress.js` 模式。

- **`TechArticleList.vue`**：
  - 空關鍵字顯示全部文章。
  - 標題命中、描述命中各一案例。
  - 大小寫無關比對。
  - 無結果空狀態。
  - 搜尋後分頁重設回第 1 頁。

## 不做（YAGNI）

- 內文（全文）搜尋。
- 建置期搜尋索引。
- 關鍵字高亮。
- 模糊 / 容錯搜尋。
- travel / running 索引。
- 搜尋歷史。
- 搜尋狀態同步至 URL。

## Probable next steps

- **UML**：不需要。資料流單純、無狀態機或複雜元件互動。
- **Figma**：不需要。UI 僅為與既有 `ArticleBox` 風格一致的搜尋欄，無需視覺稿。
