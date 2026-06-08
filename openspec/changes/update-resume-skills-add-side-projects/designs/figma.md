# Figma Designs: update-resume-skills-add-side-projects

## Figma File
- File: https://www.figma.com/design/LhsV0VkIG5jk85ZmxZP9SK/resume-side-projects-layout
- File key: LhsV0VkIG5jk85ZmxZP9SK

## Versions
- [v1] Frame node: 6:2 — 2×2 grid 佈局：Row1（教育背景 + 語言能力）、Row2（專業技能 + Side Projects）

## States
| State | Frame node | Screenshot |
|---|---|---|
| Happy path | 6:2 | screenshots/01-happy.png |

## Shared Components Used
- `Section Header`（existing）— 沿用 text-xl Bold + indigo-500 border-b-2 底線樣式
- `Skill Chip`（existing）— indigo-100 背景 + indigo-800 文字，圓角 pill
- `Side Project Card`（new）— 新增至設計系統；包含專案名稱（Semi Bold 13px）+ GitHub 徽章 + 選用網站徽章 + 描述文字（12px gray-600）

## 佈局說明

```
┌─── 教育背景 ─────────┬─── 語言能力 ────────────┐
│ 休閒與觀光管理系      │ 中文          母語       │
│ 樹德科技大學          │ 日文  流暢 - JLPT N1    │
│ 高雄市 / 2011-2015   │ 英文  普通 - TOEIC 710  │
└──────────────────────┴─────────────────────────┘
┌─── 專業技能 ─────────┬─── Side Projects ───────┐
│ [chip][chip][chip]   │ yuki-marketplace [GH↗]  │
│ [chip][chip][chip]   │ 一句描述                 │
│ [chip][chip]         │ job-scraper [GH↗]       │
│                      │ 一句描述                 │
│                      │ tw-marathon [GH↗][🌐↗]  │
│                      │ 一句描述        more →   │
└──────────────────────┴─────────────────────────┘
```

## Acceptance Criteria
- 實作畫面底部四區塊必須符合 v1 frame 6:2 的 2×2 佈局
- Row 1 的 2 欄寬度各佔 50%（grid-cols-2），gap 為 32px
- Row 2 的 2 欄寬度各佔 50%（grid-cols-2），gap 為 32px
- Skills 欄 chips 使用 flex-wrap，indigo-100 背景 + indigo-800 文字 + rounded-full
- Side Projects 每個專案顯示名稱（font-medium）+ GitHub icon + 選用網站 icon + 一句描述（text-xs gray-600）
- `tw-marathon-website` 需額外顯示網站 icon，連結至 https://marathontw-web.bibiota.com/
- "more →" 文字連結右對齊，指向 https://github.com/BIBIOTA，顏色 indigo-600
- 整體色系沿用現有 indigo 系列，不更動其他區塊樣式
