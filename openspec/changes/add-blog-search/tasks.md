# Tasks: add-blog-search

## 1. 索引產生（build/dev 時期）

- [x] 1.1 在 `loadData.js` 新增 `stripMarkdown()` helper
  - Acceptance: WHEN 傳入含程式碼區塊、HTML 標籤、markdown 語法符號與連結語法的內文字串 THEN 回傳去除上述語法、壓縮多餘空白後的純文字
  - Depends on: -
  - Independence: independent
  - status: passing

- [x] 1.2 在 `loadData.js` 新增並匯出 `getTechSearchIndex()`
  - Acceptance: WHEN 於 build/dev 時期呼叫 THEN 回傳技術文章陣列，每項為 `{ title, description, href, avatar, date, tags, content }` AND `content` 為經 `stripMarkdown()` 純文字化的完整內文
  - Depends on: 1.1
  - Independence: serial
  - status: passing

- [x] 1.3 在 `config.js` 加入 Vite `buildStart` 外掛寫出索引檔
  - Acceptance: WHEN dev 或 build 啟動 THEN 外掛呼叫 `getTechSearchIndex()` 並把 `JSON.stringify` 結果寫到 `docs/public/tech-search-index.json` AND dev 與 build 產出的索引一致
  - Depends on: 1.2
  - Independence: serial
  - status: passing

## 2. 搜尋 UI 與過濾（瀏覽器端）

- [x] 2.1 在 `TechArticleList.vue` 加入搜尋欄與狀態
  - Acceptance: WHEN tech 列表頁載入 THEN 列表頂部顯示搜尋輸入欄 AND 元件具備 `query`、`searchIndex`、`indexLoading`、`indexError` 狀態 AND 初始不 fetch 索引、僅顯示既有 `theme.techPosts`
  - Depends on: 1.3
  - Independence: serial
  - status: passing

- [x] 2.2 延遲載入索引
  - Acceptance: WHEN 使用者首次聚焦搜尋欄或第一次輸入 THEN 以 `fetch('/tech-search-index.json')` 載入索引一次並存入 `searchIndex` 快取 AND 後續操作不再重新 fetch AND fetch 僅於 client 端觸發（SSR 期間不執行）
  - Depends on: 2.1
  - Independence: serial
  - status: passing

- [x] 2.3 實作子字串過濾與分頁整合
  - Acceptance: WHEN `query` 為空 THEN 顯示既有 `theme.techPosts` 完整列表 AND WHEN `query` 有值 THEN 對 `searchIndex` 以 `title + description + content` 做大小寫無關子字串比對 AND 過濾結果沿用既有 `ArticleBox` 與 `Pagination` AND 關鍵字變動時分頁重設回第 1 頁 AND 輸入套用約 200ms debounce
  - Depends on: 2.2
  - Independence: serial
  - status: passing

- [x] 2.4 邊界情況與錯誤處理
  - Acceptance: WHEN 索引尚未載入完成就輸入 THEN 顯示載入中狀態且載完後自動套用當前關鍵字 AND WHEN fetch 失敗 THEN 顯示簡短錯誤提示並回退到原本完整列表、頁面不崩壞 AND WHEN 過濾後無結果 THEN 顯示空狀態 AND 關鍵字比對前先去前後空白並 `toLowerCase()`
  - Depends on: 2.3
  - Independence: serial
  - status: passing

## 3. 測試

- [x] 3.1 `stripMarkdown()` 與 `getTechSearchIndex()` 單元測試
  - Acceptance: WHEN 執行測試 THEN 涵蓋 `stripMarkdown()` 去除程式碼區塊/HTML/markdown 符號 AND 涵蓋 `getTechSearchIndex()` 輸出含 `content` 欄位且各欄位正確
  - Depends on: 1.2
  - Independence: parallel-safe
  - status: passing

- [x] 3.2 `TechArticleList.vue` 搜尋行為測試（擴充既有測試，mock `global.fetch`）
  - Acceptance: WHEN 執行測試 THEN 涵蓋空關鍵字顯示全部文章、標題命中、描述命中、內文命中、大小寫無關比對、無結果空狀態、fetch 失敗回退完整列表、搜尋後分頁重設回第 1 頁
  - Depends on: 2.4
  - Independence: serial
  - status: passing

## Optional artifacts
- [ ] PlantUML diagrams (spec-driven-dev:writing-uml)
- [ ] Figma designs (spec-driven-dev:writing-figma)
