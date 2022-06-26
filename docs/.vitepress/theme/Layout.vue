<template>
 <div>
    <!-- TODO: Fixed watch route -->
    <!-- <Header :theme="theme" /> -->

    <div class="flex justify-center">
      <Layout class=".page_content" />
    </div>

    <Footer />
 </div>
</template>
<script>
import Header from '@theme/components/Header.vue'
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
    Header,
    Layout,
    Footer,
  },
}
</script>
