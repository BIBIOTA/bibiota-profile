import Layout from './Layout.vue'
import DefaultTheme from 'vitepress/theme'
import ZoomImg from './components/ZoomImg.vue'
import ResumeLayout from './components/ResumeLayout.vue'
import './styles/index.postcss'
import './styles/global.sass'

export default {
  extends: DefaultTheme,
  Layout: Layout,

  enhanceApp({ app, router, siteData }) {
    app.component('ZoomImg', ZoomImg)
    app.component('ResumeLayout', ResumeLayout)
  }
}
