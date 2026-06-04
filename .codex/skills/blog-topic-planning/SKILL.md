---
name: blog-topic-planning
description: Use when the user wants to start a new article for the bibiota-blog from an initial topic or question, especially a technical article or Daily Questions Challenge entry. Plans and confirms article direction before metadata or drafting.
---

# Blog Topic Planning

Plan a new bibiota-blog article from a rough topic. This skill only produces an article brief; it does not create the final article.

## Workflow

1. Detect the user's language and keep user-facing replies in that language.
2. Read project context before proposing direction:
   - `docs/tech/posts/`
   - `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md`
   - Recent articles related to the topic.
   - `.codex/skills/blog-authoring-shared/blog-style-guide.md`
3. Decide whether the topic is likely:
   - Daily Questions Challenge technical article.
   - General technical article.
   - Travel or running article.
   - Out of scope for this first toolkit.
4. Ask the user to confirm the article direction before writing any handoff file.
5. After confirmation, create:
   - `docs/superpowers/article-drafts/YYYY-MM-DD-slug/article-brief.md`

## Brief Content

The brief must include:

- Working topic.
- Confirmed article type.
- Intended reader.
- Article purpose.
- Core question the article answers.
- Scope.
- Non-goals.
- Suggested category if it is a Daily Questions Challenge article.
- Notes from similar existing posts.

If slug and date are not confirmed yet, use a conservative draft folder name such as `YYYY-MM-DD-topic-draft`; `blog-metadata-planning` may rename or create the final folder later.

## Stop Conditions

Stop with `needs-user-decision` when:

- The topic is too broad.
- The article could belong to multiple categories and the trade-off matters.
- The requested article type is outside the current technical/Daily Questions Challenge focus.

Stop with `blocked` when the repository context needed to plan the article cannot be read.

## Handoff

End every completed run with:

```text
Status: completed
Brief written to: {path}
是否要進入 blog-metadata-planning 來確認 title、description、date、slug、tags、avatar 與置頂索引分類？
```

Do not invoke `blog-metadata-planning` automatically.
