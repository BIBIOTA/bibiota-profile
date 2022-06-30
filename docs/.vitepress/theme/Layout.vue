<template>
 <div>
    <div class="flex justify-center">
      <Layout class=".page_content" />
    </div>

    <Footer />
 </div>
</template>
<script>
import Footer from '@theme/components/Footer.vue'
import DefaultTheme from 'vitepress/theme';
import { useData } from 'vitepress'

const { Layout } = DefaultTheme;

export default {
  setup() {
    const { theme } = useData();
    return {
      theme,
    }
  },
  components: {
    Layout,
    Footer,
  },
}
</script>
