<template>
  <div class="w-[760px] max-w-full">
    <Title :text="articleTitle" />
    <ArticleBox :articles="articles" />
  </div>
</template>
<script>
import Title from '@theme/components/Title.vue'
import ArticleBox from '@theme/components/ArticleBox.vue'
import { useRoute, useData } from 'vitepress'

export default {
  components: {
    Title,
    ArticleBox,
  },
  setup() {
    const { theme } = useData();
    const { path } = useRoute();
    const articleTitle = 'Travel Articles';

    return {
      articleTitle,
      path,
      theme,
    }
  },
  computed: {
    articles() {
      const articles = [];
      if (this.theme.travelPosts && this.theme.travelPosts.length > 0) {
        this.theme.travelPosts.forEach(post => {
          articles.push({
            title: post.title,
            date: post.date,
            href: post.href,
            avatar: post.avatar,
            description: post.description,
            tags: post.tags || [],
          });
        });
      }
      return articles;
    },
  },
}
</script>