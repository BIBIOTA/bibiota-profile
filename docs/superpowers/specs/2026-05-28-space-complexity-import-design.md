---
name: space-complexity-import-design
description: Design spec for importing the Space Complexity article from Notion into the blog
metadata:
  type: project
---

# Design: Import Space Complexity Article from Notion

## Overview

Import the "[Daily Questions Challenge 03] 解釋空間複雜度 (Space Complexity)" article from Notion into the blog, fix the internal link to the time complexity article, and register it in the Challenge 00 index page.

## Source

Notion URL: https://www.notion.so/Daily-Questions-Challenge-03-Space-Complexity-36d7c329f14b801db0a9e13c32fbf8ca

## Changes

### 1. New file: `docs/tech/posts/2026-05-28-space-complexity.md`

- Frontmatter following existing blog post conventions (layout, title, description, date, tags, head meta)
- Title: `[Daily Questions Challenge 03] 解釋空間複雜度 (Space Complexity)`
- Tags: `Algorithm`, `Python`
- Convert Notion content to Markdown: headings, code blocks, horizontal rules, reference links
- Replace the time complexity link (currently pointing to a ChatGPT conversation URL) with the repo-internal relative path: `./2026-05-26-time-complexity.md`

### 2. Update: `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md`

Add the new article under the 演算法 section:

```markdown
- [解釋空間複雜度 (Space Complexity)](./2026-05-28-space-complexity.md)
```

## Constraints

- File naming follows the `YYYY-MM-DD-<slug>.md` convention
- All external reference links are preserved as-is
- No new components or configuration changes required
