# Resume PDF Overflow Fix Design

## Problem

After adding nested positions for AsiaYo (Senior BE + BE), all 3 language PDFs overflow to 2 pages.

### Space Analysis (px, A4 content area = 1085px)

| Language | Total | Overflow |
|----------|-------|----------|
| zh-TW | 1576 | +491 (45%) |
| en | 1920 | +835 (77%) |
| ja | 1796 | +711 (66%) |

Work Experience section is the dominant consumer (56-61% of content).

## Solution

### 1. Content Reduction (PersonalData.js)

AsiaYo BE achievements: 7 → 4 items

- **Keep #3**: Product line expansion (hotel → cruise, THSR, group tours)
- **Keep #4**: Solo PHP 7.1→8.2 / Laravel 6→11.x upgrade
- **Keep #5**: 3rd party CRM integration → revenue increase
- **Merge #6+#7**: Legacy modernization (frontend/backend separation + Legacy PHP → Laravel migration)
- **Delete #1**: Local dev environment optimization (covered by Senior role's DX achievements)
- **Delete #2**: Automation scripts (covered by Senior role's DX achievements)

### 2. Print CSS Tuning (generate-resume-pdfs.js + ResumeTemplate.vue)

- Tighten shared print line-height for `.leading-loose` (1.6 → 1.5)
- Reduce en font-size from 0.9em to 0.88em

### 3. Unchanged

- Senior BE content (2 responsibilities + 2 achievements)
- How Design entry
- Summary, Education, Skills sections
- Template structure (ResumeTemplate.vue)
