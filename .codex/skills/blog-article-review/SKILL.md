---
name: blog-article-review
description: Use when a bibiota-blog article draft exists and should be reviewed before publishing for technical accuracy, conceptual consistency, Traditional Chinese writing quality, punctuation, headings, VitePress frontmatter, references, and Daily Questions Challenge rules.
---

# Blog Article Review

Review a drafted bibiota-blog article and apply clear mechanical fixes before publishing.

## Required Inputs

- Path to the drafted article.
- `.codex/skills/blog-authoring-shared/blog-style-guide.md`
- `.codex/skills/blog-authoring-shared/article-template.md`

If available, also read the article's `article-brief.md` and `article-metadata.md`.

## Workflow

1. Read the article, style guide, and template.
2. Check content and conceptual accuracy.
3. Check grammar, punctuation, headings, and Markdown formatting.
4. Check frontmatter completeness.
5. Check `title`, `description`, Open Graph meta, and Twitter meta consistency.
6. Check required VitePress imports and components.
7. Check references and source attribution.
8. Check Daily Questions Challenge number, avatar, and pinned index link when applicable.
9. Apply mechanical fixes directly.
10. Write:
    - `docs/superpowers/article-drafts/YYYY-MM-DD-slug/article-review-report.md`

## Mechanical Fixes

Apply these without asking when the intended fix is clear:

- Missing or inconsistent `head` meta copied from confirmed title and description.
- Missing `ArticleTitle` or `ScrollToTopBtn` import and component usage.
- Reference section heading or bullet formatting.
- Heading level jumps.
- Clear typo, punctuation, or spacing issues.
- Missing Daily Questions Challenge avatar when the article is confirmed as a Challenge entry.

Record every applied fix in `article-review-report.md`.

## Judgment Issues

Stop and ask the user before changing:

- Possible conceptual errors.
- Conflicting source interpretations.
- Ambiguous category or tag choices.
- Changes that materially alter the article's stance.
- Rewriting a personal anecdote or opinion.

Use `needs-user-decision` for unresolved choices and `review-failed` when the article should not be published until corrected.

## Report Format

The review report must include:

- Article path.
- Review status.
- Checks performed.
- Fixes applied.
- Issues requiring user decision.
- Recommended next command.

## Handoff

End every completed run with:

```text
Status: completed
Review report written to: {path}
是否要執行 npm run docs:build 做網站建置驗證，或準備 commit？
```

Do not run build or commit unless the user confirms.
