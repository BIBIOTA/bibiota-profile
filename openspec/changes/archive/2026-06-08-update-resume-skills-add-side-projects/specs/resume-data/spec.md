## ADDED Requirements

### Requirement: 專業技能標籤應反映目前主力技術
The system SHALL render only currently relevant skill tags; deprecated technologies SHALL be removed and AI tooling SHALL use updated naming.

#### Scenario: 技能標籤移除
- **WHEN** `personalDataRaw.skills` 被讀取
- **THEN** 陣列不包含 `'PHP/Laravel'`、`'Node.js/NestJs'`、`'Golang'`
- **AND** 包含 `'Claude/Codex'`（原 `'Claude Code'` 已更名）
- **AND** 共剩餘 8 個技能

## ADDED Requirements

### Requirement: PersonalData.js 應包含 sideProjects 資料
The system SHALL expose a `sideProjects` array in `personalDataRaw` with i18n descriptions and link metadata for each project.

#### Scenario: sideProjects 資料結構完整
- **WHEN** `personalDataRaw.sideProjects` 被讀取
- **THEN** 陣列包含 3 個物件，每個物件具有 `name`（string）、`description`（`{ 'zh-TW', en, ja }`）、`github`（URL string）、`url`（URL string 或 `null`）
- **AND** `tw-marathon-website` 的 `url` 為 `'https://marathontw-web.bibiota.com/'`
- **AND** `yuki-marketplace` 與 `job-scraper` 的 `url` 為 `null`

### Requirement: FinalResume.vue 應提供 sideProjects 的 locale computed 映射
The system SHALL compute a locale-resolved `sideProjects` array from `personalDataRaw` inside the `personalData` computed property.

#### Scenario: computed sideProjects locale 映射
- **WHEN** `personalData` computed 以任一 locale（`zh-TW`、`en`、`ja`）計算
- **THEN** `personalData.sideProjects` 為陣列，每個元素包含 `name`、`description`（對應 locale 的字串）、`github`、`url`

> See: ../../designs/figma.md

#### Scenario: sideProjects 翻譯 key 存在
- **WHEN** `t('sections.sideProjects')` 以任一 locale 呼叫
- **THEN** 回傳 `'Side Projects'`（三種語言均相同）
