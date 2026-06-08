## Why
履歷頁的專業技能欄位包含已不再主力使用的技術（PHP/Laravel、Node.js/NestJs、Golang），且缺乏 Side Projects 區塊，無法展示個人專案成果。現有底部佈局（學歷 + 語言能力 2 欄 + 全寬技能）有剩餘空間，可在維持 PDF 1 頁限制的前提下新增 Side Projects。

## What Changes
- **resume-data**：移除過時技能標籤、更名 `Claude Code` → `Claude/Codex`、新增 `sideProjects` 陣列（含 3 個專案的 i18n 描述與連結）、FinalResume.vue 新增 computed mapping 與 translations key
- **resume-layout**：底部佈局改為 2×2 格線（Row1：學歷 + 語言能力；Row2：專業技能 + Side Projects）；新增 Side Projects 右半欄（GitHub icon、網站 icon、描述、more 連結）；`docs/public/website.svg` 新增至 repo

## Impact
- Affected specs: `specs/resume-data/`, `specs/resume-layout/`
- Affected code: `docs/.vitepress/theme/components/PersonalData.js`, `docs/.vitepress/theme/components/FinalResume.vue`, `docs/.vitepress/theme/components/ResumeTemplate.vue`, `docs/public/website.svg`
- Breaking changes: No

## Related Artifacts
### Design
- [design.md](./design.md)
- [tasks.md](./tasks.md)

### Figma Designs
- [Figma reference](./designs/figma.md)
