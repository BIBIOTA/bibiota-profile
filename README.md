### Yuki Ota's profile

![vue.js](https://img.shields.io/badge/vue.js-%5E3.5-blue)
![vitepress](https://img.shields.io/badge/vitepress-%5E1.6.4-blue)
![tailwindcss](https://img.shields.io/badge/tailwindcss-%5E3.4-blue)

Personal portfolio and resume website for Yuki Ota (太田裕揮). [Live Site](https://me.bibiota.com/)

#### Features

- Homepage with profile introduction and social media links
- Multi-language resume (zh-TW / en / ja) with print-optimized layout
- Automated resume PDF generation via GitHub Actions + Playwright
- Blog sections for tech, travel, and running articles
- Responsive design for all screen sizes

#### Tech Stack

- **VitePress 1.x** — Static site generation (Vite + Vue 3)
- **Tailwind CSS 3.x** — Utility-first styling with PostCSS + SASS
- **Playwright** — Headless Chromium for resume PDF rendering
- **GitHub Actions** — CI/CD for PDF generation + Vercel deployment

#### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run docs:dev
```

The dev server runs at http://localhost:5173.

#### Build

```bash
# Build the static site
npm run docs:build

# Preview the build
npm run docs:serve
```

#### Resume PDF Generation

Resume PDFs are automatically generated via GitHub Actions when resume-related files are modified (`PersonalData.js`, `ResumeTemplate.vue`). The workflow renders each language version (zh-TW, en, ja) and validates each PDF is exactly 1 page.

To generate locally:

```bash
# Install Playwright browser
npx playwright install chromium

# Build site and generate PDFs
npm run build:pdf
```

Generated PDFs are saved to `docs/public/pdf/`.

#### Troubleshooting

- **CI fails with "PDF has N pages"**: Resume content for that language is too long. Reduce content or adjust print CSS in `ResumeTemplate.vue`.
- **Playwright browser not found**: Run `npx playwright install chromium`.
- **Port 8080 occupied**: Free the port with `lsof -ti:8080 | xargs kill` before running the preview server.

#### License

[MIT licensed](LICENSE).
