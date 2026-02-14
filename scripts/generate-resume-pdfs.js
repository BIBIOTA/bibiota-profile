import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';
const OUTPUT_DIR = process.env.OUTPUT_DIR
  ? path.resolve(process.env.OUTPUT_DIR)
  : path.resolve(__dirname, '../docs/public/pdf');
const LANGUAGES = [
  { code: 'zh-TW', file: 'resume-zh-tw-yuki.ota.pdf' },
  { code: 'en', file: 'resume-en-yuki.ota.pdf' },
  { code: 'ja', file: 'resume-jp-yuki.ota.pdf' },
];

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
