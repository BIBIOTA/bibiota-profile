# Tasks: add-blog-pagination

## 1. Create Pagination.vue component

- [ ] 1.1 Create `docs/.vitepress/theme/components/Pagination.vue`
  - Acceptance: WHEN `totalPages <= 1` THEN the component renders nothing. WHEN `totalPages > 1` THEN a row of page buttons is rendered with "Previous" and "Next" buttons flanking the numbered page buttons. WHEN `currentPage === 1` THEN "Previous" is disabled. WHEN `currentPage === totalPages` THEN "Next" is disabled. WHEN the active page button is rendered THEN it is visually distinct (background `#334DCC`, white text). WHEN a page button is clicked THEN the component emits `change` with the target page number.
  - Depends on: -
  - Independence: independent

## 2. Modify TechArticleList.vue

- [ ] 2.1 Add `page` data property and `mounted()` URL parsing
  - Acceptance: WHEN the component is server-side rendered THEN `page` defaults to `1` (no `window` access). WHEN the component mounts in the browser THEN `page` is set by parsing `window.location.search` for the `?page=N` query param, defaulting to `1` if absent or non-numeric.
  - Depends on: -
  - Independence: independent

- [ ] 2.2 Add `currentPage`, `paginatedArticles`, and `totalPages` computed properties
  - Acceptance: WHEN `page` is `0`, negative, or non-numeric THEN `currentPage` returns `1`. WHEN `page` exceeds `totalPages` THEN `currentPage` returns `totalPages`. WHEN `currentPage` is valid THEN `paginatedArticles` returns `articles.slice((currentPage - 1) * 10, currentPage * 10)`. WHEN `articles` has 17 entries THEN `totalPages` returns `2`.
  - Depends on: 2.1
  - Independence: serial

- [ ] 2.3 Add `handlePageChange(page)` method
  - Acceptance: WHEN `handlePageChange(2)` is called THEN `this.page` is set to `2`, the URL is updated to `?page=2` via `history.pushState`, and `window.scrollTo(0, 0)` is called. WHEN `handlePageChange(1)` is called THEN the URL is updated to `?page=1` via `history.pushState`.
  - Depends on: 2.1
  - Independence: parallel-safe

- [ ] 2.4 Update template to wire `paginatedArticles` and `<Pagination>`
  - Acceptance: WHEN the template renders THEN `<ArticleBox>` receives `paginatedArticles` (not the full `articles`). WHEN `totalPages > 1` THEN `<Pagination>` is rendered below `<ArticleBox>` with `currentPage` and `totalPages` props and a `@change="handlePageChange"` listener. WHEN `totalPages <= 1` THEN `<Pagination>` is hidden and the page is visually identical to the current state.
  - Depends on: 1.1, 2.2, 2.3
  - Independence: serial

## 3. Verification

- [ ] 3.1 Manual verification
  - Acceptance: WHEN there are > 10 tech articles THEN pagination controls appear on `/tech/`. WHEN the user clicks page 2 THEN the URL updates to `?page=2`, articles 11–20 are shown, and the viewport scrolls to the top. WHEN the user navigates directly to `?page=2` THEN the correct page renders. WHEN `?page=999` is entered THEN the last page is shown. WHEN `?page=abc` is entered THEN page 1 is shown. WHEN there are ≤ 10 articles THEN pagination controls do not appear.
  - Depends on: 2.4
  - Independence: serial

## Optional artifacts

- [ ] PlantUML diagrams (spec-driven-dev:writing-uml)
- [ ] Figma designs (spec-driven-dev:writing-figma)
