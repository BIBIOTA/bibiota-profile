# Tasks: add-article-authoring-toolkit

## 1. Shared Authoring Assets
- [x] 1.1 Create shared blog style guide
  - Acceptance: WHEN a Skill needs blog writing conventions THEN it can read `.codex/skills/blog-authoring-shared/blog-style-guide.md` for language, tone, article shape, references, and Daily Questions Challenge rules.
  - Depends on: -
  - Independence: parallel-safe
- [x] 1.2 Create shared article template
  - Acceptance: WHEN a Skill needs to draft a technical article THEN it can read `.codex/skills/blog-authoring-shared/article-template.md` for frontmatter, meta fields, required Vue imports, body structure, reference format, and Daily Questions Challenge index update pattern.
  - Depends on: -
  - Independence: parallel-safe

## 2. Topic Planning Skill
- [x] 2.1 Create `blog-topic-planning` Skill
  - Acceptance: WHEN the user provides an article topic THEN `.codex/skills/blog-topic-planning/SKILL.md` instructs Codex to inspect existing blog articles, identify likely article area, confirm direction, and write `article-brief.md`.
  - Depends on: 1.1
  - Independence: serial
- [x] 2.2 Define topic planning handoff behavior
  - Acceptance: WHEN topic planning completes THEN the Skill reports status and asks whether to continue to `blog-metadata-planning` without automatically invoking it.
  - Depends on: 2.1
  - Independence: serial

## 3. Metadata Planning Skill
- [x] 3.1 Create `blog-metadata-planning` Skill
  - Acceptance: WHEN `article-brief.md` exists THEN `.codex/skills/blog-metadata-planning/SKILL.md` instructs Codex to propose title, description, date, slug, target path, tags, avatar, pinned behavior, and Daily Questions Challenge index category.
  - Depends on: 1.1, 1.2, 2.1
  - Independence: serial
- [x] 3.2 Define metadata confirmation gate
  - Acceptance: WHEN metadata is proposed THEN the Skill asks the user to confirm all metadata before any article file is drafted.
  - Depends on: 3.1
  - Independence: serial
- [x] 3.3 Define slug and numbering safety checks
  - Acceptance: WHEN a slug already exists or Daily Questions Challenge numbering cannot be inferred safely THEN the Skill stops with `needs-user-decision` instead of overwriting or guessing.
  - Depends on: 3.1
  - Independence: serial

## 4. Research And Writing Skill
- [x] 4.1 Create `blog-research-writing` Skill
  - Acceptance: WHEN `article-brief.md` and `article-metadata.md` exist THEN `.codex/skills/blog-research-writing/SKILL.md` instructs Codex to research sources, draft the target Markdown article, include references, and follow shared style and template rules.
  - Depends on: 1.1, 1.2, 3.1
  - Independence: serial
- [x] 4.2 Define source quality requirements
  - Acceptance: WHEN the topic is technical THEN the Skill requires official documentation, standards, primary sources, or credible technical references before drafting.
  - Depends on: 4.1
  - Independence: serial
- [x] 4.3 Define time-sensitive research behavior
  - Acceptance: WHEN an article topic depends on current or changing information THEN the Skill requires live source verification before writing factual claims.
  - Depends on: 4.1
  - Independence: serial
- [x] 4.4 Define Daily Questions Challenge index update behavior
  - Acceptance: WHEN metadata requires a Daily Questions Challenge index update THEN the Skill updates `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md` under the confirmed category.
  - Depends on: 4.1, 4.2
  - Independence: serial
- [x] 4.5 Define writing handoff behavior
  - Acceptance: WHEN drafting completes THEN the Skill reports the created or updated files and asks whether to continue to `blog-article-review`.
  - Depends on: 4.1
  - Independence: serial

## 5. Article Review Skill
- [x] 5.1 Create `blog-article-review` Skill
  - Acceptance: WHEN a drafted article path is provided THEN `.codex/skills/blog-article-review/SKILL.md` instructs Codex to review technical accuracy, conceptual consistency, grammar, punctuation, headings, formatting, frontmatter, meta consistency, references, and Daily Questions Challenge rules.
  - Depends on: 1.1, 1.2, 4.1
  - Independence: serial
- [x] 5.2 Define mechanical fix behavior
  - Acceptance: WHEN review finds mechanical issues such as missing meta fields, missing required components, or reference formatting issues THEN the Skill applies clear fixes and records them in `article-review-report.md`.
  - Depends on: 5.1
  - Independence: serial
- [x] 5.3 Define judgment issue behavior
  - Acceptance: WHEN review finds a possible conceptual error, conflicting source interpretation, or ambiguous category THEN the Skill stops with `needs-user-decision` or `review-failed` and asks the user before changing the article.
  - Depends on: 5.1
  - Independence: serial
- [x] 5.4 Define final verification handoff
  - Acceptance: WHEN review completes THEN the Skill summarizes the result and asks whether to run `npm run docs:build` or prepare a commit.
  - Depends on: 5.1, 5.2
  - Independence: serial

## 6. Workflow Handoff And Status Contract
- [x] 6.1 Standardize stage output locations
  - Acceptance: WHEN any article workflow stage writes handoff artifacts THEN it uses `docs/superpowers/article-drafts/YYYY-MM-DD-slug/` for `article-brief.md`, `article-metadata.md`, and `article-review-report.md`.
  - Depends on: 2.1, 3.1, 5.1
  - Independence: serial
- [x] 6.2 Standardize terminal statuses
  - Acceptance: WHEN any Skill finishes THEN it reports exactly one status from `completed`, `needs-user-decision`, `blocked`, or `review-failed`.
  - Depends on: 2.1, 3.1, 4.1, 5.1
  - Independence: serial
- [x] 6.3 Ensure Skills remain independently runnable
  - Acceptance: WHEN a user invokes any single Skill directly with the required input artifact THEN the Skill can run without requiring the previous Skill to be active in chat history.
  - Depends on: 6.1, 6.2
  - Independence: serial

## 7. Verification
- [x] 7.1 Verify Skill documents against the design
  - Acceptance: WHEN the Skill files are reviewed THEN each Skill has trigger rules, inputs, outputs, user confirmation points, handoff behavior, and shared asset references matching `design.md`.
  - Depends on: 1.1, 1.2, 2.1, 3.1, 4.1, 5.1, 6.2
  - Independence: serial
- [x] 7.2 Verify repository build remains unchanged
  - Acceptance: WHEN `npm run docs:build` is executed after the toolkit is added THEN the VitePress site builds successfully.
  - Depends on: 7.1
  - Independence: serial
- [x] 7.3 Verify no runtime or UI scope was introduced
  - Acceptance: WHEN the final diff is reviewed THEN changes are limited to Codex Skill toolkit files and approved OpenSpec files.
  - Depends on: 7.1
  - Independence: serial

## Optional artifacts
- [x] PlantUML diagrams (spec-driven-dev:writing-uml) — not selected by user
- [x] Figma designs (spec-driven-dev:writing-figma) — not selected by user
