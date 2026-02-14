import { defineConfig } from 'vitepress'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import {
  getMetaData,
  getTitle,
  getDescription,
} from './loadData'

export default defineConfig({
  title: getTitle(),
  description: getDescription(),
  locales: {
    '/': { lang: 'zh-TW' }
  },
  head: getMetaData(),
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
