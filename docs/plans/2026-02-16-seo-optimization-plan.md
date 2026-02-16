# SEO Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add minimum viable SEO to bibiota-profile: sitemap, robots.txt, canonical URLs, OG image/twitter card, and JSON-LD Person schema.

**Architecture:** VitePress 1.6.4 built-in `sitemap` config for sitemap generation, `transformPageData` hook for per-page canonical/og:url/JSON-LD injection, and static `robots.txt` in public directory. Global meta tags added in `loadData.js`.

**Tech Stack:** VitePress 1.6.4, no new dependencies.

---

### Task 1: Add OG Image and Twitter Card meta tags to loadData.js

**Files:**
- Modify: `docs/.vitepress/loadData.js:41-57`

**Step 1: Add the three missing meta tags**

In `docs/.vitepress/loadData.js`, add these three entries to the array returned by `getMetaData()`, right after the existing Twitter meta tags (after line 48):

```js
export function getMetaData() {
  const url = process.env.VITE_APP_SITE_URL;
  const title = getTitle();
  const description = getDescription();
  return [
    // Twitter
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: `${url}avatar.jpeg` }],
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh-tw' }],
    ['meta', { property: 'og:site', content: url }],
    ['meta', { property: 'og:site_name', content: title }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: `${url}avatar.jpeg` }],
  ];
}
```

New lines are: `twitter:card`, `twitter:image`, and `og:image`. All use existing `avatar.jpeg` from `docs/public/`.

**Step 2: Commit**

```bash
git add docs/.vitepress/loadData.js
git commit -m "feat(seo): add twitter:card, og:image, twitter:image meta tags"
```

---

### Task 2: Create robots.txt

**Files:**
- Create: `docs/public/robots.txt`

**Step 1: Create the file**

Create `docs/public/robots.txt` with:

```
User-agent: *
Allow: /

Sitemap: https://me.bibiota.com/sitemap.xml
```

VitePress copies files from `docs/public/` to the build root, so this will be served at `https://me.bibiota.com/robots.txt`.

**Step 2: Commit**

```bash
git add docs/public/robots.txt
git commit -m "feat(seo): add robots.txt with sitemap reference"
```

---

### Task 3: Add sitemap config and transformPageData hook to config.js

**Files:**
- Modify: `docs/.vitepress/config.js`

**Step 1: Add sitemap and transformPageData to the defineConfig object**

Replace the full contents of `docs/.vitepress/config.js` with:

```js
import { defineConfig } from 'vitepress'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import {
  getMetaData,
  getTitle,
  getDescription,
} from './loadData'

const siteUrl = 'https://me.bibiota.com'

export default defineConfig({
  title: getTitle(),
  description: getDescription(),
  locales: {
    '/': { lang: 'zh-TW' }
  },
  head: getMetaData(),
  sitemap: {
    hostname: siteUrl
  },
  transformPageData(pageData) {
    const canonicalUrl = `${siteUrl}/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: canonicalUrl }]
    )

    // JSON-LD Person schema for Home and Resume pages
    if (pageData.relativePath === 'index.md' || pageData.relativePath === 'resume.md') {
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Yuki Ota',
        alternateName: '太田裕揮',
        url: siteUrl,
        image: `${siteUrl}/avatar.jpeg`,
        jobTitle: 'Software Engineer',
        sameAs: [
          'https://github.com/BIBIOTA',
          'https://www.linkedin.com/in/ota-yuki/'
        ]
      }
      pageData.frontmatter.head.push(
        ['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)]
      )
    }
  },
  themeConfig: {
    title: "Yuki Ota's profile",
    nav: [
      { text: 'Resume', link: '/resume'  },
      // { text: 'Tech', link: '/tech/'  },
      // { text: 'Travel', link: '/travel/' },
      // { text: 'Running', link: '/running/' }
    ]
  },
  vite: {
    css: {
      postcss: {
          plugins: [
            tailwindcss(),
            autoprefixer(),
          ]
      }
    },
    define: {
      __VUE_PROD_DEVTOOLS__: false
    }
  },
  appearance: false,
})
```

Key changes:
- Extract `siteUrl` constant (avoids repeating the URL)
- Add `sitemap: { hostname: siteUrl }`
- Add `transformPageData` hook with canonical URL, og:url, and JSON-LD Person schema

**Step 2: Commit**

```bash
git add docs/.vitepress/config.js
git commit -m "feat(seo): add sitemap, canonical URLs, og:url, JSON-LD Person schema"
```

---

### Task 4: Build and verify all SEO changes

**Step 1: Run the build**

```bash
cd /Users/yuki/projects/bibiota-profile && npm run docs:build
```

Expected: Build succeeds without errors.

**Step 2: Verify sitemap.xml was generated**

```bash
cat docs/.vitepress/dist/sitemap.xml
```

Expected: XML file listing all site URLs under `https://me.bibiota.com`.

**Step 3: Verify robots.txt exists in output**

```bash
cat docs/.vitepress/dist/robots.txt
```

Expected: The robots.txt content we created.

**Step 4: Verify index.html has all SEO tags**

```bash
grep -E 'canonical|og:url|og:image|twitter:card|twitter:image|ld\+json' docs/.vitepress/dist/index.html
```

Expected: Lines containing:
- `rel="canonical" href="https://me.bibiota.com/"`
- `property="og:url" content="https://me.bibiota.com/"`
- `property="og:image" content="https://me.bibiota.com/avatar.jpeg"`
- `name="twitter:card" content="summary"`
- `name="twitter:image" content="https://me.bibiota.com/avatar.jpeg"`
- `type="application/ld+json"` with Person schema

**Step 5: Verify resume.html has canonical + JSON-LD**

```bash
grep -E 'canonical|ld\+json' docs/.vitepress/dist/resume.html
```

Expected: Both canonical URL (`resume.html`) and JSON-LD Person schema present.

**Step 6: Verify a blog post has canonical but no JSON-LD**

```bash
grep -E 'canonical|ld\+json' docs/.vitepress/dist/tech/posts/2022-cheerio.html
```

Expected: Canonical URL present, no JSON-LD (Person schema only on Home/Resume).
