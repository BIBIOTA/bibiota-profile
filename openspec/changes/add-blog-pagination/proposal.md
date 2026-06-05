## Why
The Tech blog article list currently renders all posts on a single page with no pagination. As the number of articles grows, this makes the page long and harder to navigate. Adding page-number pagination with URL support improves navigation, lets users share links to specific pages, and keeps the initial page load focused.

## What Changes
- **pagination**: Add a reusable `Pagination.vue` component and wire client-side pagination into `TechArticleList.vue`, slicing articles into pages of 10 with `?page=N` URL sync.

## Impact
- Affected specs: `specs/pagination/`
- Affected code: `docs/.vitepress/theme/TechArticleList.vue`, `docs/.vitepress/theme/components/Pagination.vue` (new)
- Breaking changes: No

## Related Artifacts
### Design
- [design.md](./design.md)
- [tasks.md](./tasks.md)
