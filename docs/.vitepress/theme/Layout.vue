<template>
 <div>
    <!-- 判斷是否為履歷頁面 -->
    <div v-if="isResumePage">
      <ResumeLayout />
    </div>
    
    <!-- 一般頁面佈局 -->
    <div v-else>
      <div class="flex justify-center">
        <Layout class=".page_content" />
      </div>
      <Footer />
    </div>
 </div>
</template>
<script>
import Footer from '@theme/components/Footer.vue'
import ResumeLayout from './components/ResumeLayout.vue'
import DefaultTheme from 'vitepress/theme';
import { useData } from 'vitepress'
import { computed } from 'vue'

const { Layout } = DefaultTheme;

export default {
  setup() {
    const { theme, frontmatter, page } = useData();
    
    const isResumePage = computed(() => {
      return frontmatter.value.layout === 'resume' || page.value.relativePath.includes('resume')
    })
    
    return {
      theme,
      isResumePage
    }
  },
  components: {
    Layout,
    Footer,
    ResumeLayout,
  },
}
</script>
