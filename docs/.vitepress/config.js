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
            require('tailwindcss'),
            require('autoprefixer'),
          ]
      }
    },
    define: {
      __VUE_PROD_DEVTOOLS__: false
    }
  },
  theme: './theme/index.js',
  appearance: false,
}
