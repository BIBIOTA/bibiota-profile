---
change_id: add-blog-search
doc_language: 繁體中文
---

# 設計：部落格文章搜尋功能

## 目標

在部落格新增以關鍵字搜尋技術文章的功能，比對範圍涵蓋 **標題（title）、描述（description）與完整內文**。搜尋以列表頁內嵌即時篩選的方式呈現，全程在客戶端執行，符合本站靜態網站（VitePress）的架構。

## 範圍

- **涵蓋分類**：僅技術文章（`docs/tech/posts/`）。travel 與 running 暫不納入。
- **搜尋入口**：既有 Blog 列表頁（`docs/tech/index.md` → `TechArticleList.vue`）頂部內嵌搜尋欄，即時篩選下方列表。
- **索引內容**：`title + description + 完整內文`（純文字化）。
- **搜尋方式**：大小寫無關的子字串比對（針對中文 CJK 無空白斷詞的特性，子字串比對最準且零依賴）。

## 方案選擇

採用 **獨立 JSON 索引 + 客戶端子字串比對、延遲載入** 的方案。

比較過的替代方案：

- **MiniSearch / Fuse.js 全文函式庫**：可得排序與容錯，但這類函式庫以空白斷詞，中文需自訂 bigram 分詞器才有效，複雜度高、對中文效益有限。捨棄。
- **VitePress 內建 local search（`provider: 'local'`）**：免自建索引，但它是全域搜尋按鈕 + modal，與「列表頁內嵌即時篩選」的 UX 不符；且會索引全站（履歷/首頁/travel/running），本站又用自訂 `Layout.vue` 隱藏預設導覽列，整合會與現有設計衝突。捨棄。

## 架構

```
build/dev 時期                          瀏覽器端（tech 列表頁）
──────────────                          ──────────────────────
loadData.js                             TechArticleList.vue
  └ getTechSearchIndex()   ──寫出──▶     ├ 搜尋輸入欄（新增）
      · 讀每篇 md                          ├ query 狀態
      · stripMarkdown() 純文字化           ├ 首次聚焦時 fetch 索引（延遲）
      · 產生 index 物件      docs/public/  ├ 子字串比對過濾
                            tech-search-   └ 過濾結果沿用現有分頁 / ArticleBox
        ▲                   index.json
   Vite buildStart 外掛
   （config.js 內，dev + build 都執行）
```

## 元件

系統拆為三個各具單一職責、可獨立測試的單元。

### 1. `loadData.js` — `getTechSearchIndex()` 與 `stripMarkdown()`

- **職責**：產生技術文章的搜尋索引資料。
- **作法**：重用既有 `loadArticlesFromDirectory` 的讀檔與 gray-matter 解析邏輯；新增 `stripMarkdown(body)` helper，將 markdown 內文轉為純文字（去除程式碼區塊、HTML 標籤、markdown 語法符號、連結語法等，並壓縮多餘空白）。
- **輸出**：陣列，每項為 `{ title, description, href, avatar, date, tags, content }`，其中 `content` 為純文字化的完整內文。
- **依賴**：`fs`、`gray-matter`（皆為現有相依）。

### 2. `config.js` — Vite `buildStart` 外掛

- **職責**：在建置管線中把索引寫入靜態資源目錄。
- **作法**：於 VitePress config 的 `vite.plugins` 加入輕量外掛，`buildStart()` hook 呼叫 `getTechSearchIndex()`，把結果 `JSON.stringify` 後寫到 `docs/public/tech-search-index.json`。
- **理由**：`buildStart` 在 dev 與 build 都會執行，確保兩者索引一致，且不需新增 npm script。寫檔這個副作用被隔離在建置外掛中，資料函式 `getTechSearchIndex()` 維持純粹。
- **產出路徑**：`docs/public/tech-search-index.json` → 部署後可由前端以 `/tech-search-index.json` 取得。

### 3. `TechArticleList.vue` — 搜尋 UI 與過濾邏輯（擴充既有元件，不新增元件）

- **職責**：呈現搜尋欄並依關鍵字篩選文章列表。
- **新增狀態**：`query`（關鍵字）、`searchIndex`（延遲載入的索引，記憶體快取）、`indexLoading`（載入中）、`indexError`（載入失敗）。
- **行為**：
  - `query` 為空 → 顯示既有 `theme.techPosts`（維持現狀）。
  - `query` 有值 → 對 `searchIndex` 做 `title + description + content` 大小寫無關子字串比對；過濾結果沿用既有 `ArticleBox` 與 `Pagination`（過濾集也可分頁）。
  - 索引在**首次聚焦搜尋欄或第一次輸入**時 `fetch` 一次並快取。
  - 輸入加約 200ms debounce；關鍵字變動時分頁重設回第 1 頁。
- **重用**：沿用 `ArticleBox`、`Pagination`、`Title`，不新增元件。

## 資料流

1. build/dev 啟動 → Vite `buildStart` 呼叫 `getTechSearchIndex()` → 寫出 `docs/public/tech-search-index.json`。
2. 使用者進入 tech 列表頁 → 僅載入既有 `theme.techPosts`，不抓索引，頁面載入速度不受影響。
3. 使用者首次聚焦搜尋欄或第一次輸入 → `fetch('/tech-search-index.json')` 一次，存入 `searchIndex`（之後不再抓）。
4. 每次輸入（debounce 後）→ 對 `searchIndex` 過濾 → 更新結果 → 分頁重設第 1 頁。
5. 清空關鍵字 → 回到原本 `theme.techPosts` 完整列表。

## 邊界情況與錯誤處理

- **索引尚未載入完成就輸入**：顯示載入中狀態，載完後自動套用當前關鍵字。
- **fetch 失敗（網路 / 檔案缺失）**：顯示簡短錯誤提示（例如「搜尋暫時無法使用」），列表回退到原本完整清單，頁面不崩壞。
- **無結果**：顯示「找不到符合的文章」空狀態。
- **關鍵字正規化**：前後去空白、`toLowerCase()`；空字串視為未搜尋。
- **搜尋狀態不寫入 URL**：維持簡單；既有 `?page=` 分頁在搜尋時運作於過濾集。
- **SSR 安全**：`fetch` 與 `window` 僅在 client 端（`mounted` / 事件）觸發，避免 SSR 期間執行。

## 測試

沿用既有 `tests/unit/` + vitest + `__mocks__/vitepress.js` 模式。

- **`stripMarkdown()`**：程式碼區塊、HTML、markdown 語法符號都能去除成純文字。
- **`getTechSearchIndex()`**：輸出含 `content` 欄位且各欄位正確。
- **`TechArticleList.vue`**（擴充既有測試，mock `global.fetch`）：
  - 空關鍵字顯示全部文章。
  - 標題命中、描述命中、內文命中各一案例。
  - 大小寫無關比對。
  - 無結果空狀態。
  - fetch 失敗回退到完整列表。
  - 搜尋後分頁重設回第 1 頁。

## 不做（YAGNI）

- 關鍵字高亮。
- 模糊 / 容錯搜尋。
- travel / running 索引。
- 搜尋歷史。
- 搜尋狀態同步至 URL。

## Probable next steps

- **UML**：不需要。資料流單純、無狀態機或複雜元件互動。
- **Figma**：不需要。UI 僅為與既有 `ArticleBox` 風格一致的搜尋欄，無需視覺稿。
