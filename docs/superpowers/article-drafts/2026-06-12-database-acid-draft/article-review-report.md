# Article Review Report: Database ACID

## Article Path

`docs/tech/posts/2026-06-12-database-acid.md`

## Review Status

completed

## Checks Performed

- Checked article against `article-brief.md` and `article-metadata.md`.
- Checked frontmatter completeness: `layout`, `title`, `description`, `date`, `avatar`, `tags`, and `head`.
- Checked `title`, `description`, Open Graph meta, and Twitter meta consistency.
- Checked required VitePress imports and component usage: `ArticleTitle` and `ScrollToTopBtn`.
- Checked Daily Questions Challenge number, avatar, and pinned index link.
- Checked Database category placement in `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md`.
- Checked Markdown heading structure, table formatting, code block formatting, and reference section.
- Checked source attribution against official PostgreSQL, MySQL, and SQLite documentation.
- Checked for residual Alice/Bob transfer wording after the example rewrite.

## Fixes Applied

- Added an `affected_rows = 1` note to the course-seat decrement SQL example so the transaction example does not imply that `UPDATE ... WHERE seats_remaining > 0` automatically fails when no row is updated.
- Updated the follow-up sentence to say that a zero-row seat decrement should trigger `ROLLBACK`.

## Issues Requiring User Decision

None.

## Notes

- The article intentionally uses a course registration example instead of the transfer example mentioned in the original brief, following the later editorial direction.
- `pinned: true` is not set, which is correct for an ordinary Daily Questions Challenge entry.
- Build verification was not run in this review step because `blog-article-review` requires confirmation before running `npm run docs:build`.

## Recommended Next Command

```sh
npm run docs:build
```
