---
change_id: update-resume-skills-add-side-projects
doc_language: 繁體中文
---

# 履歷技能更新與 Side Projects 區塊新增

## 目標

1. 調整專業技能標籤（移除已過時技術、更名 AI 工具）
2. 重新佈局底部為 2×2 格線：Row1（學歷 + 語言能力）、Row2（專業技能 + Side Projects）
3. 新增 Side Projects 區塊（右半欄），包含 3 個專案及 more 連結

## 修改範圍

觸及 3 個檔案：

| 檔案 | 角色 | 變更內容 |
|---|---|---|
| `docs/.vitepress/theme/components/PersonalData.js` | 資料層 | 刪除 3 個 skills、更名 Claude Code、新增 sideProjects 陣列 |
| `docs/.vitepress/theme/components/FinalResume.vue` | 資料轉換層 | 新增 sideProjects computed mapping + 3 語言翻譯 key |
| `docs/.vitepress/theme/components/ResumeTemplate.vue` | 呈現層 | 底部佈局改 2×2 格線、新增 Side Projects 右半欄 |

## 資料層變更（PersonalData.js）

### 專業技能調整

- **移除**：`'PHP/Laravel'`、`'Node.js/NestJs'`、`'Golang'`
- **更名**：`'Claude Code'` → `'Claude/Codex'`
- 調整後剩餘 8 個技能：`MySQL/MongoDB`、`Redis`、`GraphQL/REST API`、`Docker`、`CI/CD Pipeline`、`Claude/Codex`、`Issue & Log Tracking`、`System Analysis`

### 新增 sideProjects 陣列

```js
sideProjects: [
  {
    name: 'yuki-marketplace',
    description: {
      'zh-TW': 'Claude Code / Codex plugin marketplace（包含工作流程）',
      en: 'Claude Code / Codex plugin marketplace (including workflows)',
      ja: 'Claude Code / Codex プラグインマーケットプレイス（ワークフロー含む）',
    },
    github: 'https://github.com/BIBIOTA/yuki-marketplace',
    url: null,
  },
  {
    name: 'job-scraper',
    description: {
      'zh-TW': '自動化職缺爬蟲，整合各大求職平台資料',
      en: 'Automated job scraper integrating multiple job platform data',
      ja: '複数の求人プラットフォームを統合した自動職缺スクレイパー',
    },
    github: 'https://github.com/BIBIOTA/job-scraper',
    url: null,
  },
  {
    name: 'tw-marathon-website',
    description: {
      'zh-TW': '台灣馬拉松賽事資訊整合平台',
      en: 'Taiwan marathon race information aggregation platform',
      ja: '台湾マラソン大会情報統合プラットフォーム',
    },
    github: 'https://github.com/BIBIOTA/tw-marathon-website',
    url: 'https://marathontw-web.bibiota.com/',
  },
]
```

## 資料轉換層變更（FinalResume.vue）

### translations 物件新增 key

```js
'zh-TW': { 'sections.sideProjects': 'Side Projects' }
'en':    { 'sections.sideProjects': 'Side Projects' }
'ja':    { 'sections.sideProjects': 'Side Projects' }
```

### personalData computed 新增 sideProjects 映射

```js
sideProjects: personalDataRaw.sideProjects.map(p => ({
  name: p.name,
  description: p.description[localeKey],
  github: p.github,
  url: p.url,
}))
```

## 呈現層變更（ResumeTemplate.vue）

### 底部佈局重構

**現有結構（2 欄 + 全寬）：**

```
┌─── 學歷 ─────────┬─── 語言能力 ────┐
└──────────────────┴─────────────────┘
┌──────────────────── 專業技能 ───────┐
└────────────────────────────────────┘
```

**新結構（2×2 格線）：**

```
┌─── 學歷 ─────────┬─── 語言能力 ────────────┐  Row 1
└──────────────────┴─────────────────────────┘
┌─── 專業技能 ─────┬─── Side Projects ───────┐  Row 2
│ [chip][chip]     │ yuki-marketplace [GH↗]  │
│ [chip][chip]     │ 一句話描述               │
│ [chip][chip]     │ job-scraper [GH↗]       │
│ [chip]           │ 一句話描述               │
│                  │ tw-marathon [GH↗][🌐↗]  │
│                  │ 一句話描述     more →    │
└──────────────────┴─────────────────────────┘
```

### CSS grid 調整

- 現有 `education-languages-grid`（`grid-cols-1 md:grid-cols-2`）保持 2 欄，用於 Row 1
- 移除現有獨立全寬 Skills `<section>`
- 新增 `skills-side-projects-grid`（`grid-cols-1 md:grid-cols-2`），用於 Row 2，左欄放 Skills chips，右欄放 Side Projects
- print CSS 兩個 grid 均套用 `grid-template-columns: 1fr 1fr`

### Side Projects section

- Section header 沿用相同樣式（`text-xl font-bold border-b-2 border-indigo-500`）
- 每個專案一行：專案名稱（`font-medium`）+ 圖示連結
  - GitHub icon：`<img :src="withBase('/github.svg')">`（已存在）
  - 網站 icon：inline SVG（external-link 樣式，與現有 SVG 視覺一致）
- 描述文字：`text-xs text-gray-600`
- "more →" 連結：右對齊，`text-xs text-indigo-600`，指向 `https://github.com/BIBIOTA`

### print CSS 調整

- `.education-languages-grid` print 規則維持 `grid-template-columns: 1fr 1fr`（不變）
- 新增 `.skills-side-projects-grid` print 規則（`grid-template-columns: 1fr 1fr`）
- Side Projects section 在 PDF 中保留顯示（不加 `print:hidden`）
- 若 PDF 產生後發生溢出，優先壓縮 Side Projects 的 `space-y` 間距或描述字體大小

## PDF 1 頁限制評估

| 區塊 | 現有高度（估算） | 變更後高度（估算） |
|---|---|---|
| Header | ~3cm | ~3cm（不變） |
| 個人簡介 | ~2.5cm | ~2.5cm（不變） |
| 工作經歷 | ~13cm | ~13cm（不變） |
| Row 1：學歷 + 語言能力（2欄並排） | ~4cm（2列疊加） | ~4cm（維持 2 欄） |
| Row 2：技能 + Side Projects（2欄並排） | ~2cm（技能全寬） | ~4cm（兩欄並排） |
| **合計** | **~24.5cm** | **~26cm** |

A4 可用高度約 28.7cm（`max-height: 287mm`），總計約 26cm 在限制內。若實際渲染超出，優先壓縮 Side Projects 的 `space-y` 間距。

## 測試計畫

1. 本地 `npm run docs:dev` 確認網頁版三語言顯示正確
2. `npm run build:pdf` 產生 PDF，確認 3 個語言版本均為 1 頁
3. 確認 GitHub icon 和 website icon 連結可正確點擊
4. 確認 "more →" 連結指向正確 GitHub 頁面

## Designs
- [Figma Designs](./designs/figma.md) — 2×2 佈局 frames 與 acceptance criteria

## Probable next steps

- writing-uml: 不需要（無複雜狀態機或資料流）
- writing-figma: 完成（designs/figma.md）
