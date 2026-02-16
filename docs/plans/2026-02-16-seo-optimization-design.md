# SEO Optimization Design - Minimum Viable SEO

Date: 2026-02-16

## Background

bibiota-profile is a VitePress personal profile site deployed at https://me.bibiota.com/. Current SEO setup includes basic meta tags (title, description, og:title, og:description, twitter:title, twitter:description) but is missing several critical components for proper search engine indexing and social sharing.

Active pages: Home (`/`) and Resume (`/resume`). Blog routes (Tech/Travel/Running) exist but are commented out from navigation.

## Goals

- Enable proper search engine crawling and indexing
- Improve social media sharing appearance
- Add structured data for rich search results
- Zero new dependencies

## Changes

### 1. Sitemap (config.js)

Add VitePress built-in sitemap generation:

```js
sitemap: {
  hostname: 'https://me.bibiota.com'
}
```

VitePress auto-generates `sitemap.xml` at build time for all pages.

### 2. Robots.txt (new file: docs/public/robots.txt)

```
User-agent: *
Allow: /
Sitemap: https://me.bibiota.com/sitemap.xml
```

### 3. Canonical URLs + og:url (config.js)

Add `transformPageData` hook to auto-inject per-page canonical URL and og:url:

```js
transformPageData(pageData) {
  const canonicalUrl = `https://me.bibiota.com/${pageData.relativePath}`
    .replace(/index\.md$/, '')
    .replace(/\.md$/, '.html')

  pageData.frontmatter.head ??= []
  pageData.frontmatter.head.push(
    ['link', { rel: 'canonical', href: canonicalUrl }],
    ['meta', { property: 'og:url', content: canonicalUrl }]
  )
}
```

### 4. OG Image + Twitter Card (loadData.js)

Add missing global meta tags to `getMetaData()`:

```js
['meta', { name: 'twitter:card', content: 'summary' }],
['meta', { property: 'og:image', content: `${url}avatar.jpeg` }],
['meta', { name: 'twitter:image', content: `${url}avatar.jpeg` }],
```

Uses existing `avatar.jpeg` from `docs/public/`.

### 5. JSON-LD Person Schema (config.js)

Inject Person schema on Home and Resume pages via `transformPageData`:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Yuki Ota",
  "alternateName": "太田裕揮",
  "url": "https://me.bibiota.com",
  "image": "https://me.bibiota.com/avatar.jpeg",
  "jobTitle": "Software Engineer",
  "sameAs": [
    "https://github.com/BIBIOTA",
    "https://www.linkedin.com/in/ota-yuki/"
  ]
}
```

## Files Changed

| File | Action |
|------|--------|
| `docs/.vitepress/config.js` | Add sitemap config, transformPageData hook |
| `docs/.vitepress/loadData.js` | Add twitter:card, og:image, twitter:image |
| `docs/public/robots.txt` | New file |

## Out of Scope

- RSS feeds
- hreflang tags
- Article schema for blog posts
- OG Image generation
- Content/description optimization
- Blog route SEO (routes currently disabled)
