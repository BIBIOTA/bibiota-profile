# Tasks: update-resume-skills-add-side-projects

## 1. 資料層（PersonalData.js）

- [x] 1.1 調整 skills 陣列
  - Acceptance: WHEN `personalDataRaw.skills` 被讀取 THEN 不包含 `'PHP/Laravel'`、`'Node.js/NestJs'`、`'Golang'`，且原 `'Claude Code'` 已更名為 `'Claude/Codex'`，共剩 8 個技能
  - Depends on: -
  - Independence: independent
  - status: passing

- [x] 1.2 新增 sideProjects 陣列
  - Acceptance: WHEN `personalDataRaw.sideProjects` 被讀取 THEN 包含 3 個物件，每個物件有 `name`（字串）、`description`（含 `zh-TW`/`en`/`ja` 三個 key）、`github`（URL 字串）、`url`（URL 字串或 `null`）；`tw-marathon-website` 的 `url` 為 `'https://marathontw-web.bibiota.com/'`，其餘為 `null`
  - Depends on: -
  - Independence: independent
  - status: passing

## 2. 資料轉換層（FinalResume.vue）

- [x] 2.1 新增 sideProjects 翻譯 key
  - Acceptance: WHEN `t('sections.sideProjects')` 以任一語言呼叫 THEN 分別回傳 `'Side Projects'`（zh-TW）、`'Side Projects'`（en）、`'Side Projects'`（ja）
  - Depends on: -
  - Independence: independent
  - status: passing

- [x] 2.2 新增 sideProjects computed mapping
  - Acceptance: WHEN `personalData` computed 以當前 locale 計算 THEN `personalData.sideProjects` 為陣列，每個元素包含 `name`、`description`（對應當前語言字串）、`github`、`url`
  - Depends on: 1.2
  - Independence: serial
  - status: passing

## 3. 呈現層（ResumeTemplate.vue）

- [x] 3.1 底部格線改 2×2
  - Acceptance: WHEN 網頁版顯示 THEN 底部呈現兩列：Row1（學歷 + 語言能力，各佔 50%）、Row2（專業技能 + Side Projects，各佔 50%）；WHEN PDF 列印時 THEN 兩個 grid 均套用 `grid-template-columns: 1fr 1fr`；現有獨立全寬 Skills section 移除，Skills chips 移入 Row2 左欄
  - Depends on: 1.1
  - Independence: serial
  - status: passing

- [x] 3.2 新增 Side Projects section
  - Acceptance: WHEN `personalData.sideProjects` 有 3 個項目 THEN 頁面顯示標題為 `t('sections.sideProjects')` 的區塊，每個專案顯示名稱、描述文字、GitHub icon 連結（`/github.svg`），`url` 非 null 的專案額外顯示網站 icon 連結；WHEN 頁面最底部 THEN 顯示 `more →` 文字連結指向 `https://github.com/BIBIOTA`
  - Depends on: 2.2, 3.3
  - Independence: serial
  - status: passing

- [x] 3.3 新增 website.svg 至 public 並在 Side Projects 中引用
  - Acceptance: WHEN `url` 不為 null 的 Side Project 渲染時 THEN 顯示 `<img :src="withBase('/website.svg')" class="w-4 h-4 inline-block" />` icon，視覺大小與 GitHub icon（`/github.svg` w-4 h-4）對齊；`docs/public/website.svg` 檔案已存在
  - Depends on: -
  - Independence: independent
  - status: passing

## 4. 驗證

- [x] 4.1 本地 dev server 三語言確認
  - Acceptance: WHEN `npm run docs:dev` 啟動後切換 zh-TW / en / ja THEN Side Projects 描述文字對應語言正確顯示，三欄佈局無版面崩潰，所有連結有效
  - Depends on: 1.1, 1.2, 2.1, 2.2, 3.1, 3.2, 3.3
  - Independence: serial
  - status: passing

- [x] 4.2 PDF 產生確認 1 頁
  - Acceptance: WHEN `npm run build:pdf` 完成 THEN 三個語言版本（zh-TW、en、ja）PDF 均為恰好 1 頁，Side Projects 區塊可見且未被截斷
  - Depends on: 4.1
  - Independence: serial
  - status: passing

## Optional artifacts

- [ ] PlantUML diagrams (spec-driven-dev:writing-uml)
- [x] Figma designs (spec-driven-dev:writing-figma) — 底部三欄佈局 + Side Projects section，需沿用現有 indigo 色系設計風格，不更動整體配色
