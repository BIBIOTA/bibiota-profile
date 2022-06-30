import Layout from './Layout.vue'
import DefaultTheme from 'vitepress/theme'
import './styles/index.postcss'
import './styles/global.sass'

export default {
  // root component to wrap each page
  ...DefaultTheme,
  Layout: Layout,

  // this is a Vue 3 functional component
  NotFound: () => 'Not Found',

  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from `createApp()`.
    // router is VitePress' custom router. `siteData` is
    // a `ref` of current site-level metadata.
  }
}
