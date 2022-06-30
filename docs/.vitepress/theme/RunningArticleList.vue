<template>
  <div>
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
    const articleTitle = 'Running Articles';

    return {
      articleTitle,
      path,
      theme,
    }
  },
  computed: {
    articles() {
      const articles = [];
      if (this.theme.runningPosts && this.theme.runningPosts.length > 0) {
        this.theme.runningPosts.forEach(post => {
          articles.push({
            title: post.title,
            date: post.date,
            href: post.href,
            avatar: post.avatar,
          });
        });
      }
      return articles;
    },
  },
}
</script>