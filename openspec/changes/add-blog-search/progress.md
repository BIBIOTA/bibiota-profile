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

## Session 9 — 2026-07-08 01:10（updating-spec）
- Stage: updating-spec
- Scope change requested: 搜尋比對範圍由「標題＋描述＋內文」縮小為「僅標題＋描述」（內文搜尋結果與使用者預期落差過大）。走「簡化」路線，移除整套全文索引基礎設施。
- Artifacts updated:
  - `specs/blog-search/spec.md`：改為 title+description，移除索引產生需求與 fetch 相關 scenario。
  - `design.md`：新增「範圍變更紀錄」，方案改為直接篩選 `theme.techPosts`。
  - `proposal.md`：更新 What Changes / Impact / 新增 Scope 變更段。
  - `tasks.md`：群組 1–3 標記 superseded（保留歷史），新增群組 4（移除索引、改寫元件、更新測試）。
  - `verification-report.md`：加註 SUPERSEDED。
- Validation: `openspec validate add-blog-search --strict` → exit 0（valid）。
- Next action: 使用者 review 更新後規格；核可後以 TDD 執行群組 4（移除索引基礎設施、元件改為 title+description、更新測試），再重跑 verification-before-completion。

## Session 10 — 2026-07-08 01:20
- Stage: TDD
- Task: 4.1 移除全文索引基礎設施
- Transition: not_started → in_progress
- Next action: 刪除過時的 `loadData.test.js` 並移除 `loadData.js`/`config.js`/`.gitignore` 的索引相關程式碼。

## Session 11 — 2026-07-08 01:26
- Stage: TDD
- Task: 4.1 移除全文索引基礎設施
- Transition: in_progress → passing
- Evidence:
  - Commits: e3a84c4 feat: 移除全文索引基礎設施（純刪除任務，無 red phase；以刪除 `loadData.test.js` + 全套測試維持綠燈驗證）
  - Tests: `vitest run` → 3 files / 28 passed
- Next action: 進入任務 4.2，撰寫 `TechArticleList.vue` 改為 title+description 篩選的紅燈測試。

## Session 12 — 2026-07-08 01:28
- Stage: TDD
- Task: 4.2 `TechArticleList.vue` 改為僅比對標題＋描述、直接篩選 `theme.techPosts`
- Transition: not_started → in_progress
- Next action: 改寫元件搜尋測試（title/description 命中、內文不命中、大小寫無關、關鍵字為空、查無結果、分頁重設），移除 fetch 相關案例，作為紅燈。

## Session 13 — 2026-07-08 01:40
- Stage: TDD
- Task: 4.2 `TechArticleList.vue` 改為僅比對標題＋描述；4.3 更新測試以符合新範圍
- Transition: in_progress → passing
- Evidence:
  - Commits: fb 紅燈「test: red - TechArticleList 改為 title+description 篩選」；357659f feat: green - TechArticleList 改為僅比對標題＋描述、直接篩選 techPosts
  - Tests: `vitest run` → 3 files / 24 passed（含搜尋 3 案例：關鍵字為空、關鍵字命中含內文不命中與大小寫無關、查無結果）
- Next action: 進入 `spec-driven-dev:verification-before-completion` 重新執行完成前驗證。
