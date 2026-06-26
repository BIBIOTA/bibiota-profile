---
name: blog-metadata-planning
description: Use when an article brief exists for bibiota-blog and the next step is to confirm title, description, date, slug, tags, avatar, target path, pinned behavior, and Daily Questions Challenge index placement before drafting.
---

# Blog Metadata Planning

Plan and confirm article metadata before any final article Markdown is drafted.

## Required Inputs

- `docs/superpowers/article-drafts/YYYY-MM-DD-slug/article-brief.md`
- `.codex/skills/blog-authoring-shared/blog-style-guide.md`
- `.codex/skills/blog-authoring-shared/article-template.md`

If the brief path is missing, ask the user for it or return to `blog-topic-planning`.

## Workflow

1. Read the article brief.
2. Inspect existing posts and slugs under the target article area, especially `docs/tech/posts/`.
3. If this is a Daily Questions Challenge article, inspect:
   - `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md`
   - Existing Challenge numbering and categories.
4. Propose metadata:
   - `title`
   - `description`
   - `date`
   - `slug`
   - target path
   - `tags`
   - `avatar`
   - `pinned`
   - Daily Questions Challenge number if applicable
   - pinned index category if applicable
5. Ask the user to confirm all metadata before writing the handoff file.
6. After confirmation, write:
   - `docs/superpowers/article-drafts/YYYY-MM-DD-slug/article-metadata.md`

## Metadata Rules

Technical articles use:

```text
docs/tech/posts/YYYY-MM-DD-slug.md
```

Daily Questions Challenge articles use:

```yaml
avatar: /daily-questions-challenge.png
```

Do not set `pinned: true` for ordinary Challenge entries unless the user explicitly asks. The existing Challenge index article is pinned and should be updated when a new Challenge article belongs to it.

## Stop Conditions

Stop with `needs-user-decision` when:

- The slug already exists.
- The next Challenge number is ambiguous.
- The article category is ambiguous.
- The user has not confirmed metadata.

Stop with `blocked` when required repository files cannot be read.

## Handoff

End every completed run with:

```text
Status: completed
Metadata written to: {path}
是否要進入 blog-research-writing 來查詢資料並撰寫文章草稿？
```

Do not invoke `blog-research-writing` automatically.
