# CLAUDE.md

## 專案概述

`bibiota-site` 是太田裕揮（Yuki Ota）的個人網站，包含履歷、作品集與部落格。使用 VitePress + Vue 3 + Tailwind CSS 建構，部署於 Vercel。

線上網站：https://me.bibiota.com/

## 技術棧

- **框架**：VitePress 1.6.4（基於 Vite + Vue 3 的靜態網站產生器）
- **樣式**：Tailwind CSS 3.x + PostCSS + SASS
- **PDF 產生**：Playwright（Chromium）+ pdf-lib
- **部署**：Vercel（透過 GitHub Actions 觸發）
- **CI/CD**：GitHub Actions（`.github/workflows/generate-resume-pdf.yml`）

## 專案結構

```
docs/                          # VitePress 內容根目錄
├── .vitepress/
│   ├── config.js              # VitePress 設定（導覽列、主題、PostCSS）
│   ├── loadData.js            # 部落格文章載入器（gray-matter frontmatter）
│   └── theme/
│       ├── index.js           # 主題進入點
│       ├── Layout.vue         # 主版面配置
│       ├── Home.vue           # 首頁外層元件
│       ├── i18n.js            # 多語系支援（zh-TW、en、ja）
│       ├── components/
│       │   ├── PersonalData.js    # 履歷資料（多語系）
│       │   ├── ResumeLayout.vue   # 履歷頁面版面 + 語言切換
│       │   ├── ResumeTemplate.vue # 履歷內容 + 列印用 CSS
│       │   ├── FinalResume.vue    # 履歷外層元件
│       │   ├── IndexAbout.vue     # 首頁自我介紹區塊
│       │   └── ...                # ArticleBox、Footer 等
│       └── styles/
│           ├── index.postcss  # Tailwind 指令
│           └── global.sass    # 全域樣式
├── index.md                   # 首頁（渲染 Home.vue）
├── resume.md                  # 履歷頁面
├── public/                    # 靜態資源（圖片、PDF、SVG）
├── tech/posts/                # 技術文章
├── travel/posts/              # 旅遊文章
└── running/                   # 跑步文章
scripts/
├── generate-resume-pdfs.js    # Playwright PDF 產生器（3 種語言）
└── build-with-pdfs.sh         # 建置 + PDF 產生流程
```

## 指令

```bash
# 開發
npm run docs:dev          # 啟動開發伺服器（http://localhost:5173）

# 建置
npm run docs:build        # 建置靜態網站 → docs/.vitepress/dist/

# 預覽
npm run docs:serve        # 預覽建置結果（port 8088）

# 建置並產生 PDF
npm run build:pdf         # 建置網站 + 產生履歷 PDF
```

## 重要慣例

- **僅使用 ESM**：package.json 中設定 `"type": "module"`，使用 `import`/`export`，不使用 `require`
- **多語系**：支援 3 種語言 — `zh-TW`（預設）、`en`、`ja`，資料存放於 `PersonalData.js`
- **履歷 PDF**：每種語言必須恰好 1 頁，CI 會驗證。若溢出需調整內容或 `ResumeTemplate.vue` 中的列印 CSS
- **履歷 URL 參數**：`?lang=XX` 切換語言，`?show_phone_number=true` 顯示電話號碼
- **部落格文章**：Markdown 檔案位於 `docs/tech/posts/`、`docs/travel/posts/`、`docs/running/`，使用 frontmatter（title、date、description、image）
- **深色模式**：已停用（VitePress config 中 `appearance: false`）
- **Vercel 建置**：透過 vercel.json 中 `ignoreCommand: "exit 0"` 跳過，建置由 GitHub Actions 處理

## 環境變數

```
VITE_APP_SITE_URL    # 網站 URL（用於 meta 標籤）
VITE_APP_API_URL     # 部落格 API URL（流量計數器）
VITE_PHONE_NUMBER    # 履歷用電話號碼（敏感資訊）
```

## 履歷 PDF 產生流程

當 `PersonalData.js` 或 `ResumeTemplate.vue` 在 master 分支有變更時，GitHub Actions 會：
1. 建置 VitePress 網站
2. 啟動預覽伺服器（port 8088）
3. 透過 Playwright 渲染履歷頁面 → 產生 3 份 PDF（zh-TW、en、ja）
4. 驗證每份 PDF 恰好為 1 頁
5. 部署至 Vercel

PDF 輸出路徑：`docs/public/pdf/resume-{lang}-yuki.ota.pdf`
