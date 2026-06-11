# Article Review Report: 資料庫讀寫分離

## Article Path

`docs/tech/posts/2026-06-11-database-read-write-splitting.md`

## Review Status

completed

## Checks Performed

- Confirmed frontmatter includes `layout`, `title`, `description`, `date`, `avatar`, `tags`, and social `head` metadata.
- Confirmed `title`, `description`, Open Graph metadata, and Twitter metadata are consistent with `article-metadata.md`.
- Confirmed required VitePress imports and components are present:
  - `ArticleTitle`
  - `ScrollToTopBtn`
- Checked article structure against the shared style guide:
  - Context/problem
  - Core concept
  - How it works
  - Practical trade-offs
  - Summary
  - References
- Checked Daily Questions Challenge metadata:
  - Challenge number: `17`
  - Avatar: `/daily-questions-challenge.png`
  - Pinned behavior: not pinned
  - Pinned index link exists under `Database`
- Checked references section formatting and source attribution.
- Checked conceptual consistency for:
  - Primary / Replica read-write routing
  - Asynchronous replication and replication lag
  - Read-after-write consistency
  - Difference between read/write splitting, sharding, cache, and CQRS
- Checked Traditional Chinese wording, punctuation, headings, and Markdown formatting.

## Fixes Applied

- Replaced the colloquial phrase `無腦導到 Replica` with `一律導到 Replica`.
- Added Chinese explanations for `domain model`, `command model`, and `query model` in the CQRS paragraph.

## Issues Requiring User Decision

None.

## Recommended Next Command

Run `npm run docs:build` for final site build verification, or prepare a scoped commit for the article files.
