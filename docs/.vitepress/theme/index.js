import Layout from './Layout.vue'
import DefaultTheme from 'vitepress/theme'
import ZoomImg from './components/ZoomImg.vue'
import './styles/index.postcss'
import './styles/global.sass'

export default {
  // root component to wrap each page
  ...DefaultTheme,
  Layout: Layout,

  // this is a Vue 3 functional component
  NotFound: () => 'Not Found',

  enhanceApp({ app, router, siteData }) {
    app.component('ZoomImg', ZoomImg)
  }
}
