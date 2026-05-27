# Daily Questions JWT Token Import Design

## Goal

Import the Notion article "說明JWT token" into the Tech blog as a Daily Questions Challenge article, and link it from the Challenge 00 index article.

## Source Content

- Source page: `https://www.notion.so/JWT-token-3687c329f14b807dbc80db5c449fe2db`
- Source title: `說明JWT token`
- Blog title: `[Daily Questions Challenge 02] 說明 JWT token`
- Publish date: `2026-05-27`

## Files

Create one new Tech post:

- `docs/tech/posts/2026-05-27-jwt-token.md`

Update the existing Daily Questions index:

- `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md`

## Article Format

The imported article must follow the existing Tech post format:

- YAML frontmatter with `layout: doc`, `title`, `description`, `date`, and `tags`.
- Open Graph and Twitter metadata matching the title and description.
- Existing article components:
  - `ArticleTitle`
  - `ScrollToTopBtn`

Suggested frontmatter values:

```yaml
layout: doc
title: "[Daily Questions Challenge 02] 說明 JWT token"
description: 說明 JWT token 的結構、登入流程與安全注意事項。
date: 2026-05-27
tags:
  - Backend
  - Authentication
  - Security
```

## Content Conversion

Convert the Notion content into maintainable Markdown:

- Keep the original Traditional Chinese wording unless Markdown cleanup is needed.
- Convert Notion numbered sections and bullet lists to standard Markdown.
- Convert the Access Token / Refresh Token table to a Markdown table.
- Preserve the JWT example as a fenced code block.
- Preserve the source links under a final `參考：` section.
- Remove empty Notion blocks.

## Challenge 00 Index Update

Add the Challenge 02 article link to the Challenge 00 index article.

The JWT token topic should be added under a `### Backend` section in `## 題目`, because the existing index only has `### 演算法` and JWT is an authentication/backend topic.

Expected link:

```markdown
### Backend

- [說明 JWT token](./2026-05-27-jwt-token.md)
```

## Validation

Run the VitePress build:

```bash
npm run docs:build
```

Then verify:

- The build succeeds.
- The generated Challenge 02 page exists under `docs/.vitepress/dist/tech/posts/`.
- The generated Challenge 00 page contains the JWT token link.

## Out of Scope

- No changes to article list UI.
- No changes to the content loader.
- No automated Notion sync.
- No edits to unrelated untracked files already present in the working tree.
