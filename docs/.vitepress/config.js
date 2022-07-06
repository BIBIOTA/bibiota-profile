import {
  getTechPosts,
  getTravelPosts,
  getRunningPosts,
  getMetaData,
  getTitle,
  getDescription,
} from './loadData'

export default {
  title: getTitle(),
  description: getDescription(),
  locales: {
    '/': { lang: 'zh-TW' }
  },
  head: getMetaData(),
  themeConfig: {
    techPosts: getTechPosts(),
    travelPosts: getTravelPosts(),
    // runningPosts: getRunningPosts(),
    title: "BiBiOTA's blog",
    nav: [
      { text: 'Tech', link: '/tech/'  },
      { text: 'Travel', link: '/travel/' },
      // { text: 'Running', link: '/running/' }
    ]
  },
  bundlerConfig: {
    viteOptions: {
      css: {
        postcss: {
            plugins: [
              require('tailwindcss'),
              require('autoprefixer'),
            ]
        }
      },
    }
  },
  theme: './theme/index.js',
  appearance: false,
}
