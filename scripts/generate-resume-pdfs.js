import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = process.env.BASE_URL || 'http://localhost:8088';
const OUTPUT_DIR = process.env.OUTPUT_DIR
  ? path.resolve(process.env.OUTPUT_DIR)
  : path.resolve(__dirname, '../docs/public/pdf');
const LANGUAGES = [
  { code: 'zh-TW', file: 'resume-zh-tw-yuki.ota.pdf' },
  { code: 'en', file: 'resume-en-yuki.ota.pdf' },
  { code: 'ja', file: 'resume-jp-yuki.ota.pdf' },
];

// Per-language CSS custom property overrides for print spacing.
// Uses CSS custom properties defined in ResumeTemplate.vue's scoped print styles.
const LANG_PRINT_CSS = {
  'zh-TW': `
:root {
  --print-lh-loose: 1.35;
  --print-lh-relaxed: 1.25;
  --print-lh-xs: 1.25;
  --print-lh-sm: 1.3;
  --print-gap-8: 0.45rem;
  --print-gap-4: 0.25rem;
  --print-py-6: 0.4rem;
}
`,
  'en': `
:root {
  --print-lh-loose: 1.15;
  --print-lh-relaxed: 1.1;
  --print-lh-xs: 1.12;
  --print-lh-sm: 1.12;
  --print-gap-8: 0.15rem;
  --print-gap-4: 0.1rem;
  --print-py-6: 0.2rem;
}
.pdf-content {
  font-size: 0.75em !important;
  line-height: 1.15 !important;
}
`,
  'ja': `
:root {
  --print-lh-loose: 1.2;
  --print-lh-relaxed: 1.15;
  --print-lh-xs: 1.15;
  --print-lh-sm: 1.2;
  --print-gap-8: 0.3rem;
  --print-gap-4: 0.15rem;
  --print-py-6: 0.3rem;
}
`,
};

async function generatePdfs() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let hasError = false;

  try {
    for (const lang of LANGUAGES) {
      const page = await context.newPage();
      const url = `${BASE_URL}/resume.html?lang=${lang.code}`;

      console.log(`Generating PDF for ${lang.code}...`);
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForSelector('.pdf-content', { state: 'visible' });

      // Load web fonts for consistent rendering across platforms
      await page.addStyleTag({ url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&display=swap' });
      await page.evaluate(() => document.fonts.ready);

      // Disable optical sizing to ensure consistent rendering across platforms
      await page.addStyleTag({ content: '* { font-optical-sizing: none !important; }' });

      // Inject language-specific spacing overrides
      if (LANG_PRINT_CSS[lang.code]) {
        await page.addStyleTag({ content: LANG_PRINT_CSS[lang.code] });
      }

      const pdfPath = path.join(OUTPUT_DIR, lang.file);

      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '5mm', bottom: '5mm', left: '5mm', right: '5mm' },
      });

      // Validate page count
      const pdfBytes = fs.readFileSync(pdfPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pageCount = pdfDoc.getPageCount();

      if (pageCount > 1) {
        console.error(
          `❌ ERROR: ${lang.code} PDF has ${pageCount} pages! Please reduce content or adjust CSS.`
        );
        hasError = true;
        break;
      }

      console.log(`✓ ${lang.code}: ${pageCount} page(s)`);
      await page.close();
    }
  } finally {
    await browser.close();
  }

  if (hasError) {
    process.exit(1);
  }

  console.log('\n✓ All PDFs generated successfully.');
}

generatePdfs().catch((err) => {
  console.error('Failed to generate PDFs:', err);
  process.exit(1);
});
