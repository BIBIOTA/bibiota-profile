# Tech Blog Reopen Design

## Context

The project already uses VitePress as a static blog site. Tech articles are loaded from `docs/tech/posts/` through `docs/.vitepress/loadData.js`, rendered by `docs/.vitepress/theme/TechArticleList.vue`, and exposed by `docs/tech/index.md`.

The Tech navigation item currently exists in `docs/.vitepress/config.js` but is commented out. Existing 2022 Tech posts are still present in `docs/tech/posts/`, so they would reappear if Tech navigation were reopened without additional cleanup.

## Goal

Reopen the Tech blog page and publish exactly two Notion-derived articles as one-time Markdown imports:

- `[Daily Questions Challenge] 2026 軟體後端面試題目準備與回顧`
- `解釋時間複雜度 (Time Complexity)`

The Daily Questions Challenge article must be pinned above other Tech articles. Existing old Tech articles should not be published.

## Non-Goals

- Do not add ongoing Notion synchronization.
- Do not introduce a new blog framework or content system.
- Do not redesign the Tech blog visual layout.
- Do not clean up old article image assets under `docs/public/`.

## Content Structure

Create two Markdown posts in `docs/tech/posts/`:

- `2026-05-26-daily-questions-challenge-2026.md`
- `2026-05-26-time-complexity.md`

Use the existing article frontmatter style:

```yaml
layout: doc
title: ...
description: ...
date: 2026-05-26
avatar: ...
tags:
  - ...
```

The Daily Questions Challenge post will also include:

```yaml
pinned: true
```

Notion-only syntax should be normalized into regular Markdown that VitePress can render. The Notion page mention in the Daily Questions Challenge article should become a site-local Markdown link to the Time Complexity article.

## Navigation

Re-enable the Tech navigation item in `docs/.vitepress/config.js`:

```js
{ text: 'Tech', link: '/tech/' }
```

Travel and Running navigation remain unchanged unless requested separately.

## Old Article Handling

Move the current old Tech Markdown posts out of `docs/tech/posts/` into an inactive location such as `docs/tech/archived-posts/`.

This keeps the original files available in the repository while preventing `getTechPosts()` from loading them, because the loader only scans `docs/tech/posts/`.

## Sorting

Update the Tech post data loading so frontmatter `pinned` is preserved on each post.

Sorting rule:

1. Posts with `pinned: true` come first.
2. Posts with the same pinned state are sorted by date descending.

The list UI does not need a new visual pinned badge for this change. Correct ordering is the required behavior.

## Verification

Run:

```bash
npm run docs:build
```

Then verify:

- The build succeeds.
- `/tech/` is generated.
- The Tech list contains only the two new posts.
- The Daily Questions Challenge post appears before the Time Complexity post.
- The Daily Questions Challenge article links to the Time Complexity article.

## Risks

Notion Markdown contains a few Notion-specific constructs, including page mentions and empty block markers. These must be converted or removed during the one-time import so the final VitePress Markdown is clean.

The existing loader sorts by formatted date data. The pinned sort should be implemented in the loader rather than by manipulating dates, so future articles do not accidentally displace the pinned main article.
