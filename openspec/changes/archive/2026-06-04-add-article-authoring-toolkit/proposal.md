## Why

The blog has clear article structure, metadata, and writing conventions, but creating a new article currently depends on manual repetition and conversational memory. A repo-local Codex Skill toolkit will make article planning, metadata confirmation, research, drafting, and review repeatable while preserving the existing blog style.

## What Changes

- Add a multi-Skill Codex authoring workflow for new bibiota-blog articles.
- Add shared style and article template assets used by the Skills.
- Add stage handoff artifacts for topic brief, metadata, and review reports.
- Add explicit user confirmation gates between topic planning, metadata planning, writing, and review.
- Add review rules for mechanical fixes, judgment issues, references, and Daily Questions Challenge index updates.

## Capabilities

### New Capabilities

- `blog-article-authoring-toolkit`: Defines the repo-local Skill toolkit for planning, writing, and reviewing bibiota-blog articles.

### Modified Capabilities

None.

## Impact

- Adds files under `.codex/skills/`.
- Adds OpenSpec proposal, specs, design, tasks, and verification artifacts.
- Does not change VitePress runtime, theme components, article list UI, deployment configuration, or existing published articles.
