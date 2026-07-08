## ADDED Requirements

### Requirement: 列表頁內嵌關鍵字搜尋
系統 SHALL 在既有技術文章列表頁提供內嵌搜尋欄，讓讀者以關鍵字即時篩選文章。比對範圍為文章的標題與描述，資料來源為 client 端既有的 `theme.techPosts`，不需額外載入索引。

#### Scenario: 關鍵字為空
- **WHEN** 搜尋關鍵字經去前後空白後為空字串
- **THEN** 顯示既有 `theme.techPosts` 完整列表

#### Scenario: 關鍵字命中
- **WHEN** 讀者輸入非空關鍵字
- **THEN** 系統對 `theme.techPosts` 以 `title + description` 進行大小寫無關子字串比對
- **AND** 命中標題或描述任一者的文章皆納入結果
- **AND** 過濾結果沿用既有 `ArticleBox` 與 `Pagination` 呈現
- **AND** 關鍵字變動時分頁重設回第 1 頁

### Requirement: 搜尋的邊界情況
系統 SHALL 在查無結果時維持頁面可用，顯示明確的空狀態。

#### Scenario: 查無結果
- **WHEN** 非空關鍵字過濾後無任何文章符合
- **THEN** 顯示空狀態提示
