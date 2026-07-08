## ADDED Requirements

### Requirement: 建置時期產生技術文章搜尋索引
系統 SHALL 於 build 與 dev 時期產生涵蓋技術文章標題、描述與純文字化完整內文的搜尋索引，並寫出至靜態資源目錄供前端取用。

#### Scenario: 產生索引資料
- **WHEN** 於 build/dev 時期呼叫 `getTechSearchIndex()`
- **THEN** 回傳 `docs/tech/posts/` 每篇文章對應的物件陣列
- **AND** 每項包含 `title`、`description`、`href`、`avatar`、`date`、`tags` 與 `content`
- **AND** `content` 為經 `stripMarkdown()` 純文字化的完整內文

#### Scenario: 內文純文字化
- **WHEN** `stripMarkdown()` 收到含程式碼區塊、HTML 標籤、markdown 語法符號與連結語法的內文字串
- **THEN** 回傳去除上述語法且壓縮多餘空白後的純文字

#### Scenario: 寫出索引檔
- **WHEN** dev 或 build 啟動並執行 Vite `buildStart` 外掛
- **THEN** 呼叫 `getTechSearchIndex()` 並將 `JSON.stringify` 結果寫入 `docs/public/tech-search-index.json`
- **AND** dev 與 build 產出的索引內容一致

### Requirement: 列表頁內嵌關鍵字搜尋
系統 SHALL 在既有技術文章列表頁提供內嵌搜尋欄，讓讀者以關鍵字即時篩選文章，並沿用既有列表與分頁元件呈現結果。

#### Scenario: 初始載入不抓索引
- **WHEN** 讀者進入技術文章列表頁且尚未與搜尋欄互動
- **THEN** 頁面僅顯示既有 `theme.techPosts` 完整列表
- **AND** 不發出索引 `fetch` 請求

#### Scenario: 延遲載入索引
- **WHEN** 讀者首次聚焦搜尋欄或第一次輸入
- **THEN** 以 `fetch('/tech-search-index.json')` 載入索引一次並存入記憶體快取
- **AND** 後續搜尋操作不再重新 `fetch`
- **AND** `fetch` 僅於 client 端觸發，SSR 期間不執行

#### Scenario: 關鍵字為空
- **WHEN** 搜尋關鍵字經去前後空白後為空字串
- **THEN** 顯示既有 `theme.techPosts` 完整列表

#### Scenario: 關鍵字命中
- **WHEN** 讀者輸入非空關鍵字
- **THEN** 系統對索引以 `title + description + content` 進行大小寫無關子字串比對
- **AND** 命中標題、描述或內文任一者的文章皆納入結果
- **AND** 過濾結果沿用既有 `ArticleBox` 與 `Pagination` 呈現
- **AND** 關鍵字變動時分頁重設回第 1 頁

### Requirement: 搜尋的邊界情況與錯誤處理
系統 SHALL 在索引載入中、載入失敗與查無結果等情況下維持頁面可用，不使列表崩壞。

#### Scenario: 索引載入中就輸入
- **WHEN** 索引尚未載入完成、讀者已輸入關鍵字
- **THEN** 顯示載入中狀態
- **AND** 索引載入完成後自動套用當前關鍵字進行過濾

#### Scenario: 索引載入失敗
- **WHEN** 索引 `fetch` 失敗
- **THEN** 顯示簡短錯誤提示
- **AND** 列表回退到原本 `theme.techPosts` 完整清單且頁面不崩壞

#### Scenario: 查無結果
- **WHEN** 非空關鍵字過濾後無任何文章符合
- **THEN** 顯示空狀態提示
