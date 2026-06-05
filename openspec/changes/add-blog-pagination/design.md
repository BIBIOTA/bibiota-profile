# Design: add-blog-pagination

## Summary

Add client-side page-number pagination to the Tech blog article list (`/tech/`), showing 10 articles per page with URL query param support (`?page=N`).

## Scope

- **In scope:** Tech blog (`TechArticleList.vue`) only
- **Out of scope:** Travel and Running blog sections (can be added later with the same pattern)

## Architecture

All article data continues to be loaded at build time via `loadData.js` and injected as `theme.techPosts`. Pagination is handled entirely client-side by slicing the articles array.

No changes to `loadData.js`, VitePress config, or `ArticleBox.vue`.

### Files changed

| File | Change |
|------|--------|
| `docs/.vitepress/theme/TechArticleList.vue` | Add pagination state, computed slicing, URL sync |
| `docs/.vitepress/theme/components/ArticleBox.vue` | No change |
| `docs/.vitepress/theme/components/Pagination.vue` | **New file** |

## Components

### `Pagination.vue` (new)

**Props:**
- `currentPage: Number` — current page (1-based)
- `totalPages: Number` — total number of pages

**Emits:**
- `change(page: Number)` — emitted when user clicks a page button

**Behavior:**
- Hidden when `totalPages <= 1`
- "Previous" button disabled on page 1; "Next" button disabled on last page
- Active page highlighted

**Styling:** Uses existing blog color palette — `#1A1A1F` text, `#EDECF2` background, `#334DCC` active state.

### `TechArticleList.vue` (modified)

**New data:**
- `page: Number` — reactive current page, initialized in `mounted()` from `window.location.search`

**New computed:**
- `currentPage` — parsed page number, clamped to valid range
- `paginatedArticles` — `articles.slice((currentPage - 1) * 10, currentPage * 10)`
- `totalPages` — `Math.ceil(articles.length / 10)`

**New method:**
- `handlePageChange(page)` — updates `this.page`, calls `history.pushState` to update URL, calls `window.scrollTo(0, 0)`

**Template:** `<Pagination>` added below `<ArticleBox>`, bound to `currentPage` and `totalPages`, listening to `@change`.

## Data Flow

```
URL (?page=N)
    ↓ (read in mounted())
TechArticleList
  currentPage  →  paginatedArticles (slice)  →  ArticleBox (render)
  totalPages   →  Pagination (display)
                      ↓ @change
               handlePageChange(page)
                  this.page = page
                  history.pushState → URL (?page=N)
                  window.scrollTo(0, 0)
```

**SSR safety:** `window` is not available during VitePress SSR build. `page` data is initialized to `1` by default; the actual URL value is read only inside `mounted()`.

## Error Handling

All invalid `?page` values are handled inside the `currentPage` computed:

| Input | Behavior |
|-------|----------|
| `?page=0` or negative | Clamp to page 1 |
| `?page=N` > totalPages | Clamp to last page |
| `?page=abc` (non-numeric) | Default to page 1 |
| 0 articles | Pagination hidden; existing empty-state behavior unchanged |
| ≤ 10 articles (1 page) | Pagination hidden; page looks identical to current state |

## Testing

Manual verification checklist:

- [ ] With > 10 articles: pagination controls appear
- [ ] Click page 2: URL updates to `?page=2`, articles 11–20 shown, page scrolls to top
- [ ] Navigate directly to `?page=2`: correct page renders
- [ ] `?page=999` (out of range): last page shown
- [ ] `?page=abc` (invalid): page 1 shown
- [ ] With ≤ 10 articles: pagination controls do not appear

## Probable next steps

- UML: not needed (no complex state machine)
- Figma: not needed (simple pagination UI using existing design tokens)
