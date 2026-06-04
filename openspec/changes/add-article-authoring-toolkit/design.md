# Design: Add Article Authoring Toolkit

## Purpose

Create a Codex Skill toolkit for adding new blog article topics to this VitePress blog. The toolkit should guide the user from an initial article idea through topic confirmation, metadata planning, research, article drafting, source attribution, and self-review.

The toolkit must follow the existing blog structure and writing conventions, especially the recent technical articles under `docs/tech/posts/` and the Daily Questions Challenge index article.

## Scope

This change adds authoring workflow assets only. It does not change the VitePress runtime, article list UI, theme components, or deployment configuration.

The first version focuses on article creation workflows for:

- Technical articles under `docs/tech/posts/`
- Daily Questions Challenge articles
- Updating the pinned Daily Questions Challenge index when needed

The toolkit should remain extensible for travel and running articles, but those are not the primary workflow in this change.

## Existing Blog Conventions

Technical article files use this path pattern:

```text
docs/tech/posts/YYYY-MM-DD-slug.md
```

Articles use VitePress Markdown with frontmatter. Current technical articles usually include:

- `layout: doc`
- `title`
- `description`
- `date`
- `avatar`
- `tags`
- `head` meta entries for Open Graph and Twitter

Recent technical articles also include:

```md
<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />
```

Daily Questions Challenge articles use:

```yaml
avatar: /daily-questions-challenge.png
```

The pinned index article is:

```text
docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md
```

It groups Daily Questions Challenge links by category such as Algorithm, Backend, Software Engineering, and Testing.

The observed technical article writing style is:

- Traditional Chinese
- Practical and explanatory
- Short paragraphs
- Context before definitions when useful
- Clear sections for concepts, scenarios, trade-offs, summary, and references
- Technical terms may include English in parentheses
- References are listed in a final `## 參考` section

## Architecture

Use a multi-Skill toolkit rather than one monolithic Skill.

The toolkit should be stored in the repository so it can be version controlled with the blog. The expected structure is:

```text
.codex/skills/
  blog-topic-planning/
    SKILL.md
  blog-metadata-planning/
    SKILL.md
  blog-research-writing/
    SKILL.md
  blog-article-review/
    SKILL.md
  blog-authoring-shared/
    blog-style-guide.md
    article-template.md
```

Each Skill has one clear responsibility and can be used independently. At the end of each stage, the Skill should recommend the next stage and ask the user whether to continue. The workflow is semi-automatic: no Skill should silently move into the next stage without user confirmation.

Shared blog rules should live in shared files so the Skills do not duplicate article conventions.

## Components

### `blog-topic-planning`

Input: a user-provided article topic.

Responsibilities:

- Read existing blog structure and recent articles.
- Determine the likely article area, such as technical article or Daily Questions Challenge.
- Ask the user to confirm article direction.
- Define article purpose, audience, core question, scope, and non-goals.
- Output an article brief.

Output file:

```text
docs/superpowers/article-drafts/YYYY-MM-DD-slug/article-brief.md
```

The final response should ask whether to continue to `blog-metadata-planning`.

### `blog-metadata-planning`

Input: `article-brief.md`.

Responsibilities:

- Propose article title.
- Propose description.
- Propose date and slug.
- Propose target path.
- Propose tags.
- Decide avatar.
- Decide whether `pinned` is needed.
- Decide whether the Daily Questions Challenge pinned index should be updated.
- Decide the index category for Daily Questions Challenge articles.
- Ask the user to confirm the proposed metadata before moving on.

Output file:

```text
docs/superpowers/article-drafts/YYYY-MM-DD-slug/article-metadata.md
```

The final response should ask whether to continue to `blog-research-writing`.

### `blog-research-writing`

Input:

- `article-brief.md`
- `article-metadata.md`
- Shared style guide
- Shared article template

Responsibilities:

- Research the topic before writing.
- Prefer official documentation, standards, primary sources, and credible technical references for technical topics.
- Use current sources when the topic is time-sensitive.
- Draft the article in the existing blog style.
- Include references in a final `## 參考` section.
- Create the target Markdown article.
- Update the Daily Questions Challenge pinned index if metadata requires it.

Output file:

```text
docs/tech/posts/YYYY-MM-DD-slug.md
```

The final response should ask whether to continue to `blog-article-review`.

### `blog-article-review`

Input: the drafted article path.

Responsibilities:

- Review technical accuracy and conceptual consistency.
- Check grammar, punctuation, headings, and formatting.
- Check frontmatter completeness.
- Check `title`, `description`, `og:title`, `og:description`, `twitter:title`, and `twitter:description` consistency.
- Check required VitePress imports and components.
- Check references and source attribution.
- Check Daily Questions Challenge numbering, avatar, and pinned index link when applicable.
- Apply clear fixes when the fix is mechanical.
- Stop for user decision when the issue requires judgment.

Output file:

```text
docs/superpowers/article-drafts/YYYY-MM-DD-slug/article-review-report.md
```

The final response should summarize the review result and ask whether to run build verification or prepare a commit.

### Shared Style Guide

`blog-authoring-shared/blog-style-guide.md` should define:

- Language: Traditional Chinese by default.
- Tone: practical, clear, explanatory, and personal where appropriate.
- Article shape for technical topics.
- How to use headings, lists, code blocks, diagrams, images, and references.
- Blog-specific conventions for Daily Questions Challenge articles.

### Shared Article Template

`blog-authoring-shared/article-template.md` should define:

- Frontmatter template.
- Open Graph and Twitter meta template.
- Required Vue imports and components.
- Suggested article sections.
- Reference section format.
- Daily Questions Challenge index update pattern.

## Data Flow

Use stage output files as handoff artifacts so each Skill can be resumed or rerun without relying only on chat history.

Recommended working directory per article:

```text
docs/superpowers/article-drafts/YYYY-MM-DD-slug/
```

The expected files are:

```text
article-brief.md
article-metadata.md
article-review-report.md
```

The final published article remains in the existing blog path:

```text
docs/tech/posts/YYYY-MM-DD-slug.md
```

The workflow is:

1. `blog-topic-planning` creates `article-brief.md`.
2. `blog-metadata-planning` reads the brief and creates `article-metadata.md`.
3. `blog-research-writing` reads both files, researches sources, writes the article, and updates the pinned index when needed.
4. `blog-article-review` reads the article, applies mechanical fixes, and creates `article-review-report.md`.

## User Confirmation Points

The workflow must stop for user confirmation at these points:

- Confirm article direction after topic planning.
- Confirm title, description, tags, slug, date, target path, avatar, and pinned index category after metadata planning.
- Confirm whether to proceed from research and drafting into review.
- Confirm user-judgment issues found during review.
- Confirm whether to run build verification or prepare a commit after review.

## Error Handling

The Skills should stop and ask the user when:

- The topic is too broad.
- There are not enough credible sources.
- Sources conflict in a way that affects the article.
- The slug already exists.
- Tags or pinned index category are ambiguous.
- Daily Questions Challenge numbering cannot be inferred safely.
- The topic is time-sensitive and needs current data.
- The review finds a possible conceptual error that cannot be fixed mechanically.

The Skills may automatically fix:

- Missing or inconsistent `head` meta fields.
- Missing `ArticleTitle` or `ScrollToTopBtn`.
- Inconsistent reference section formatting.
- Clear Markdown heading issues.
- Clear internal link format issues.
- Missing Daily Questions Challenge avatar for Daily Questions Challenge articles.

Each Skill should end with one of these statuses:

- `completed`
- `needs-user-decision`
- `blocked`
- `review-failed`

## Testing

Verification should include three layers.

### Skill Document Checks

- Each Skill has clear trigger rules.
- Each Skill defines inputs and outputs.
- Each Skill has a clear handoff message.
- Shared conventions are referenced instead of duplicated.
- No Skill silently proceeds into the next stage.

### Article Format Checks

- Frontmatter contains required fields.
- `title`, `description`, and meta fields are consistent.
- Filename follows `YYYY-MM-DD-slug.md`.
- Technical articles are created under `docs/tech/posts/`.
- Daily Questions Challenge articles use the correct avatar.
- Daily Questions Challenge articles update the pinned index when required.

### Site Verification

After a draft is written and reviewed, run:

```bash
npm run docs:build
```

The build must pass before claiming the article workflow is complete.

## Probable Next Steps

- UML is not required because this change does not involve complex state machines, component interaction, or runtime data flow.
- Figma is not required because this change does not change frontend UI or visual design.
- The next step after this design is approved is to create an implementation plan with `writing-plans`.
