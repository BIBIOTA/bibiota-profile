## ADDED Requirements

### Requirement: Topic planning Skill
The system SHALL provide a `blog-topic-planning` Skill that turns a user-provided article topic into a confirmed article brief before metadata or drafting begins.

#### Scenario: Topic direction confirmed
- **WHEN** the user provides a new article topic
- **THEN** the Skill inspects existing blog context, proposes an article direction, asks the user to confirm it, and writes `article-brief.md` only after confirmation

#### Scenario: Topic is too broad
- **WHEN** the provided topic is too broad to plan safely
- **THEN** the Skill stops with `needs-user-decision` and asks the user to narrow the direction

### Requirement: Metadata planning Skill
The system SHALL provide a `blog-metadata-planning` Skill that confirms article metadata before any final article file is drafted.

#### Scenario: Metadata confirmed
- **WHEN** `article-brief.md` exists
- **THEN** the Skill proposes title, description, date, slug, target path, tags, avatar, pinned behavior, and Daily Questions Challenge placement, then writes `article-metadata.md` only after user confirmation

#### Scenario: Slug conflict detected
- **WHEN** the proposed slug or target path already exists
- **THEN** the Skill stops with `needs-user-decision` instead of overwriting the existing article

### Requirement: Research and writing Skill
The system SHALL provide a `blog-research-writing` Skill that researches sources and drafts a VitePress Markdown article from confirmed brief and metadata.

#### Scenario: Article drafted from confirmed inputs
- **WHEN** `article-brief.md` and `article-metadata.md` exist
- **THEN** the Skill researches credible sources, writes the target Markdown article, includes a final `## 參考` section, and reports created or updated files

#### Scenario: Time-sensitive topic requires verification
- **WHEN** the topic depends on current or changing information
- **THEN** the Skill verifies live sources before writing factual claims

#### Scenario: Daily Questions Challenge index updated
- **WHEN** metadata requires a Daily Questions Challenge index update
- **THEN** the Skill updates `docs/tech/posts/2026-05-26-daily-questions-challenge-2026.md` under the confirmed category

### Requirement: Article review Skill
The system SHALL provide a `blog-article-review` Skill that reviews drafted articles before publishing and applies clear mechanical fixes.

#### Scenario: Mechanical fixes applied
- **WHEN** the review finds clear mechanical issues such as missing meta fields, missing required components, heading issues, or reference formatting issues
- **THEN** the Skill applies the fixes and records them in `article-review-report.md`

#### Scenario: Judgment issue found
- **WHEN** the review finds a possible conceptual error, conflicting source interpretation, or ambiguous category
- **THEN** the Skill stops with `needs-user-decision` or `review-failed` and asks the user before changing the article

### Requirement: Shared authoring conventions
The system SHALL provide shared authoring assets used by all article workflow Skills.

#### Scenario: Shared style guide available
- **WHEN** any article workflow Skill needs blog writing conventions
- **THEN** it can read `.codex/skills/blog-authoring-shared/blog-style-guide.md`

#### Scenario: Shared template available
- **WHEN** any article workflow Skill needs the VitePress article shape
- **THEN** it can read `.codex/skills/blog-authoring-shared/article-template.md`

### Requirement: Stage handoff contract
The system SHALL make each article workflow Skill independently runnable through file-based handoff artifacts and explicit statuses.

#### Scenario: Stage output location is stable
- **WHEN** a Skill writes a handoff artifact
- **THEN** it uses `docs/superpowers/article-drafts/YYYY-MM-DD-slug/` for `article-brief.md`, `article-metadata.md`, and `article-review-report.md`

#### Scenario: Skill completes with status
- **WHEN** any Skill finishes
- **THEN** it reports exactly one status from `completed`, `needs-user-decision`, `blocked`, or `review-failed`

#### Scenario: Next Skill requires user confirmation
- **WHEN** a Skill completes its stage
- **THEN** it asks whether to continue to the next Skill and does not invoke the next Skill automatically
