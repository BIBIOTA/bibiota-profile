# Progress: add-blog-search

## Session 1 — 2026-07-08 00:00
- Stage: TDD
- Task: 1.1 在 `loadData.js` 新增 `stripMarkdown()` helper
- Transition: not_started → in_progress
- Next action: 撰寫 `stripMarkdown()` 的紅燈測試（scenario「內文純文字化」），驗證去除程式碼區塊、HTML、markdown 符號與連結語法並壓縮空白。

## Session 2 — 2026-07-08 00:10
- Stage: TDD
- Task: 1.1 在 `loadData.js` 新增 `stripMarkdown()` helper
- Transition: in_progress → passing
- Evidence:
  - Commits: 88b2d07 feat: green - stripMarkdown 純文字化內文（紅燈 commit 於前）
  - Tests: `vitest run tests/unit/loadData.test.js` → 1 passed（stripMarkdown 內文純文字化）
- Next action: 進入任務 1.2，撰寫 `getTechSearchIndex()` 的紅燈測試（scenario「產生索引資料」）。

## Session 3 — 2026-07-08 00:12
- Stage: TDD
- Task: 1.2 在 `loadData.js` 新增並匯出 `getTechSearchIndex()`
- Transition: not_started → in_progress
- Next action: 撰寫 `getTechSearchIndex()` 的紅燈測試（scenario「產生索引資料」），驗證回傳含 `content` 等欄位的技術文章索引陣列。

## Session 4 — 2026-07-08 00:20
- Stage: TDD
- Task: 1.2 在 `loadData.js` 新增並匯出 `getTechSearchIndex()`
- Transition: in_progress → passing
- Evidence:
  - Commits: 2b2be55 feat: green - getTechSearchIndex 產生技術文章索引（紅燈 commit 於前）
  - Tests: `vitest run tests/unit/loadData.test.js` → 2 passed（stripMarkdown、getTechSearchIndex）
- Next action: 進入任務 1.3，撰寫 `writeTechSearchIndex()` 的紅燈測試（scenario「寫出索引檔」）。

## Session 5 — 2026-07-08 00:22
- Stage: TDD
- Task: 1.3 在 `config.js` 加入 Vite `buildStart` 外掛寫出索引檔
- Transition: not_started → in_progress
- Next action: 於 `loadData.js` 抽出可測試的 `writeTechSearchIndex(outDir)`，撰寫紅燈測試（scenario「寫出索引檔」）驗證寫出合法 JSON 索引檔。

## Session 6 — 2026-07-08 00:30
- Stage: TDD
- Task: 1.3 在 `config.js` 加入 Vite `buildStart` 外掛寫出索引檔
- Transition: in_progress → passing
- Evidence:
  - Commits: d64f62e feat: green - writeTechSearchIndex + Vite buildStart 外掛寫出搜尋索引（紅燈 commit 於前）
  - Tests: `vitest run tests/unit/loadData.test.js` → 3 passed；並實測外掛路徑寫出 docs/public/tech-search-index.json（45 篇、約 292KB）
- Next action: 進入 Cycle D（任務 2.1–2.4 與 3.2），撰寫 `TechArticleList.vue` 搜尋行為的紅燈測試。

## Session 7 — 2026-07-08 00:32
- Stage: TDD
- Task: 2.1 在 `TechArticleList.vue` 加入搜尋欄與狀態（Cycle D 涵蓋 2.1–2.4）
- Transition: not_started → in_progress
- Next action: 撰寫 `TechArticleList.vue` 搜尋行為紅燈測試（初始不抓索引、延遲載入、關鍵字為空/命中、載入中、載入失敗、查無結果），mock `global.fetch`。

## Session 8 — 2026-07-08 00:50
- Stage: TDD
- Task: 2.1–2.4 `TechArticleList.vue` 搜尋 UI 與過濾（含 3.1、3.2 測試）
- Transition: in_progress → passing
- Evidence:
  - Commits: f4b7d8a feat: green - TechArticleList 內嵌搜尋欄與即時篩選；4416c06 test: 排除暫存 worktree 過期測試副本；93c7c9d refactor: 抽出 toArticle（紅燈 commit 於前）
  - Tests: `vitest run` → 4 files / 31 passed（含 7 個搜尋 scenario 測試）
- Next action: 進入 `spec-driven-dev:verification-before-completion` 執行完成前驗證。
