### Yuki Ota's profile

![vue.js](https://img.shields.io/badge/vue.js-%5E3.2.3-blue)
![vitepress](https://img.shields.io/badge/vitepress-1.0.0--alpha.4-blue)
![tailwindcss](https://img.shields.io/badge/tailwindcss-%5E3.1.4-blue)

#### About this side-project:

- Yuki Ota's profile page. [Link](https://me.bibiota.com/)
- Tech stack: vitepress + Tailwind CSS.

### Automated Resume PDF Generation

Resume PDFs are automatically generated via GitHub Actions when resume-related files are modified (`PersonalData.js`, `ResumeTemplate.vue`). The workflow builds the VitePress site, renders each language version (zh-TW, en, ja) using Playwright, and commits the PDFs back to the repository.

Each PDF is validated to be exactly 1 page — the CI will fail if any language exceeds one page.

#### Local Testing

```bash
# Install dependencies
npm install

# Install Playwright browser
npx playwright install chromium

# Build the site
npx vitepress build docs

# Start preview server
npx vitepress serve docs --port 8080 &

# Generate PDFs
node scripts/generate-resume-pdfs.js
```

Generated PDFs are saved to `docs/public/pdf/`.

#### Troubleshooting

- **CI fails with "PDF has N pages"**: The resume content for that language is too long. Reduce content or adjust print CSS in `ResumeTemplate.vue`.
- **Playwright browser not found**: Run `npx playwright install chromium` to install the browser.
- **Server not ready**: Ensure port 8080 is free before starting the preview server. Use `lsof -ti:8080 | xargs kill` to free it.

### License

[MIT licensed](LICENSE).
