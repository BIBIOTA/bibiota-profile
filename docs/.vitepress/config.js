import { defineConfig } from 'vitepress'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import {
  getMetaData,
  getTitle,
  getDescription,
  getTechPosts,
} from './loadData'

const siteUrl = 'https://me.bibiota.com'

export default defineConfig({
  ignoreDeadLinks: [
    /^http:\/\/localhost/,
  ],
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
    techPosts: getTechPosts(),
    nav: [
      { text: 'Resume', link: '/resume'  },
      { text: 'Blog', link: '/tech/'  },
      // { text: 'Travel', link: '/travel/' },
      // { text: 'Running', link: '/running/' }
    ]
  },
  vite: {
    server: {
      allowedHosts: ['yukimac-mini.echo-mercat.ts.net'],
    },
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
