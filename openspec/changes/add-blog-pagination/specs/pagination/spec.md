## ADDED Requirements

### Requirement: System shall display a page-number navigation bar on the Tech blog list when there are more than 10 articles
The system SHALL render a `Pagination` component below the article list whenever `totalPages > 1`, allowing users to navigate between pages via numbered buttons and Previous/Next controls.

#### Scenario: Pagination hidden when articles fit on one page
- **WHEN** the Tech blog has 10 or fewer articles
- **THEN** the `Pagination` component is not rendered
- **AND** the article list appearance is identical to the current state

#### Scenario: Pagination shown when articles exceed one page
- **WHEN** the Tech blog has more than 10 articles
- **THEN** the `Pagination` component is rendered below the article list
- **AND** page number buttons are displayed for each available page
- **AND** Previous and Next buttons flank the page numbers

#### Scenario: Previous button disabled on first page
- **WHEN** the current page is 1
- **THEN** the Previous button is disabled and non-interactive

#### Scenario: Next button disabled on last page
- **WHEN** the current page equals `totalPages`
- **THEN** the Next button is disabled and non-interactive

#### Scenario: Active page button is visually distinct
- **WHEN** a page button matches the current page
- **THEN** it is rendered with background `#334DCC` and white text

---

### Requirement: System shall slice the article list to show only the articles for the current page
The system SHALL compute `paginatedArticles` as `articles.slice((currentPage - 1) * 10, currentPage * 10)` and pass only that slice to `ArticleBox`.

#### Scenario: First page shows articles 1–10
- **WHEN** `currentPage` is 1 and there are 17 articles
- **THEN** `ArticleBox` receives articles 1 through 10

#### Scenario: Second page shows articles 11–17
- **WHEN** `currentPage` is 2 and there are 17 articles
- **THEN** `ArticleBox` receives articles 11 through 17

---

### Requirement: System shall synchronise the current page with the URL query parameter
The system SHALL read `?page=N` from the URL on mount to set the initial page, and update the URL via `history.pushState` when the user changes page.

#### Scenario: Page loads with no query param
- **WHEN** the user navigates to `/tech/` with no `?page` param
- **THEN** `currentPage` is 1
- **AND** the first 10 articles are displayed

#### Scenario: Page loads with valid query param
- **WHEN** the user navigates to `/tech/?page=2`
- **THEN** `currentPage` is 2
- **AND** articles 11–20 are displayed

#### Scenario: User clicks a page button
- **WHEN** the user clicks page 3
- **THEN** the URL updates to `?page=3` via `history.pushState`
- **AND** the article list updates to show articles 21–30
- **AND** the viewport scrolls to the top of the page

---

### Requirement: System shall clamp invalid page values to a valid range
The system SHALL treat out-of-range or malformed `?page` values gracefully without throwing errors or showing an empty page.

#### Scenario: Page param is zero or negative
- **WHEN** the URL contains `?page=0` or `?page=-5`
- **THEN** `currentPage` resolves to 1
- **AND** the first page of articles is displayed

#### Scenario: Page param exceeds total pages
- **WHEN** the URL contains `?page=999` and `totalPages` is 3
- **THEN** `currentPage` resolves to 3
- **AND** the last page of articles is displayed

#### Scenario: Page param is non-numeric
- **WHEN** the URL contains `?page=abc`
- **THEN** `currentPage` resolves to 1
- **AND** the first page of articles is displayed

---

### Requirement: System shall not access `window` during SSR
The system SHALL default `page` to `1` during server-side rendering and only read `window.location.search` inside `mounted()`.

#### Scenario: SSR build does not access window
- **WHEN** VitePress performs a static build
- **THEN** `page` initialises to `1` without accessing `window`
- **AND** the build completes without a "window is not defined" error
