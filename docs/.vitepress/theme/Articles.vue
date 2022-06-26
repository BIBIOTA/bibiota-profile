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

    return {
      path,
      theme,
    }
  },
  computed: {
    articles() {
      const articles = [];
      this.theme.techPosts.forEach(post => {
        articles.push({
          title: post.title,
          date: post.date,
          href: post.href,
          avatar: post.avatar,
        });
      });
      return articles;
    },
    articleTitle() {
      let articleTitle;
      switch (this.path) {
        case '/tech/':
          articleTitle = 'Tech Articles'
          break;
        case '/travel/':
          articleTitle = 'Travel Articles'
          break;
        case '/running/':
          articleTitle = 'Running Articles'
          break;
      }
      return articleTitle;
    },
  },
}
</script>