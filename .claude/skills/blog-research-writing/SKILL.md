---
name: blog-research-writing
description: Use when a confirmed article brief and metadata file exist for bibiota-blog and the next step is to research sources, write the VitePress Markdown article, add references, and update the Daily Questions Challenge index when required.
---

# Blog Research Writing

Research and draft a bibiota-blog article from confirmed brief and metadata.

## Required Inputs

- `article-brief.md`
- `article-metadata.md`
- `.codex/skills/blog-authoring-shared/blog-style-guide.md`
- `.codex/skills/blog-authoring-shared/article-template.md`

If either handoff file is missing, stop and ask the user for the path.

## Workflow

1. Read the brief, metadata, style guide, and template.
2. Verify the target path does not overwrite an existing file unless the user explicitly requested an update.
3. Research before drafting.
4. Draft the article in the existing blog style.
5. Include a final `## 參考` section.
6. Create the target Markdown file from metadata.
7. If metadata requires it, update:
   - `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md`
8. Report created and updated files.

## Research Rules

For technical topics, prioritize:

- Official documentation.
- Standards and RFCs.
- Primary project documentation.
- Credible engineering articles.

Use live web verification for facts that may have changed recently, including library APIs, standards status, product behavior, pricing, legal requirements, or current best practices.

If credible sources are insufficient or materially conflict, stop with `blocked` or `needs-user-decision` rather than filling gaps with guesses.

## Drafting Rules

Use the shared article template for:

- Frontmatter.
- Open Graph and Twitter meta.
- Required `ArticleTitle` and `ScrollToTopBtn` imports.
- Body structure.
- Reference formatting.

Keep the article in Traditional Chinese unless the user requests otherwise. Use short paragraphs, concrete examples, and clear trade-offs.

## Daily Questions Challenge Rules

When metadata marks the article as a Daily Questions Challenge entry:

- Use the confirmed Challenge number in the title.
- Use `/daily-questions-challenge.png`.
- Add a link to the pinned index article under the confirmed category.
- Do not invent a category; stop if the category is not confirmed.

## Stop Conditions

Stop with `needs-user-decision` when:

- A target article path already exists.
- The user must choose between conflicting source interpretations.
- The Daily Questions Challenge index category is missing.

Stop with `blocked` when:

- Required sources cannot be verified.
- Required handoff files are missing.
- Required repository files cannot be read or written.

## Handoff

End every completed run with:

```text
Status: completed
Article written to: {path}
Updated files: {files}
是否要進入 blog-article-review 做內容、觀念、文法、標點、章節與排版檢查？
```

Do not invoke `blog-article-review` automatically.
