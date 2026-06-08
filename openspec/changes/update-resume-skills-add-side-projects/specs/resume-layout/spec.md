## MODIFIED Requirements

### Requirement: 履歷底部佈局應改為 2×2 格線
The system SHALL render the resume bottom section as a 2×2 grid: Row 1 (Education + Languages), Row 2 (Skills + Side Projects), replacing the previous 2-column + full-width-skills layout.

#### Scenario: 網頁版 2×2 佈局呈現
- **WHEN** 履歷頁在瀏覽器中顯示
- **THEN** 底部呈現兩列格線：Row1 左欄為學歷、右欄為語言能力；Row2 左欄為專業技能（chips）、右欄為 Side Projects
- **AND** 兩列各欄寬度各佔 50%，gap 為 32px（`gap-8`）
- **AND** 現有獨立全寬 Skills `<section>` 不再存在

> See: ../../designs/figma.md

#### Scenario: PDF 列印 2×2 佈局
- **WHEN** `npm run build:pdf` 產生 PDF
- **THEN** 三個語言版本（zh-TW、en、ja）PDF 均為恰好 1 頁
- **AND** Row1 與 Row2 的 print CSS 均套用 `grid-template-columns: 1fr 1fr`

## ADDED Requirements

### Requirement: Side Projects 區塊應顯示於 Row2 右欄
The system SHALL render a Side Projects section in the right column of Row 2, displaying project name, icon links, description, and a "more" link.

#### Scenario: Side Projects 專案列表呈現
- **WHEN** `personalData.sideProjects` 有 3 個項目
- **THEN** 頁面顯示以 `t('sections.sideProjects')` 為標題的區塊
- **AND** 每個專案顯示名稱（`font-semibold`）+ GitHub icon（`/github.svg`，黑色，w-4 h-4）+ 一句描述（`text-xs text-gray-600`）
- **AND** `url` 非 `null` 的專案額外顯示網站 icon（`/website.svg`，黑色，w-4 h-4），連結至該 URL

> See: ../../designs/figma.md

#### Scenario: Side Projects more 連結
- **WHEN** Side Projects 區塊渲染完成
- **THEN** 區塊底部顯示右對齊 `more →` 文字連結，顏色 `text-indigo-600`
- **AND** 連結指向 `https://github.com/BIBIOTA`

### Requirement: website.svg 應存在於 public 目錄
The system SHALL include `docs/public/website.svg` as the globe icon for project website links, visually matching the size of `github.svg` at w-4 h-4.

#### Scenario: website.svg 存在且可引用
- **WHEN** ResumeTemplate.vue 以 `withBase('/website.svg')` 引用圖示
- **THEN** 圖示正確載入，顯示為黑色 globe outline，視覺大小與 `/github.svg` 對齊（均為 16×16）

> See: ../../designs/figma.md
