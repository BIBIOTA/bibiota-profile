<template>
  <div>
    <Title :text="articleTitle" />
    <ArticleBox :articles="paginatedArticles" :min-items="articleBoxMinItems" />
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @change="handlePageChange"
    />
  </div>
</template>
<script>
import Title from '@theme/components/Title.vue'
import ArticleBox from '@theme/components/ArticleBox.vue'
import Pagination from '@theme/components/Pagination.vue'
import { useRoute, useData } from 'vitepress'

const PAGE_SIZE = 10

export default {
  components: {
    Title,
    ArticleBox,
    Pagination,
  },
  setup() {
    const { theme } = useData();
    const { path } = useRoute();
    const articleTitle = "Yuki's Blog";

    return {
      articleTitle,
      path,
      theme,
    }
  },
  data() {
    return {
      page: 1,
    }
  },
  mounted() {
    if (typeof window === 'undefined' || !window.location) return
    const params = new URLSearchParams(window.location.search)
    const raw = parseInt(params.get('page'), 10)
    this.page = isNaN(raw) ? 1 : raw
  },
  computed: {
    articles() {
      if (!this.theme.techPosts) return []
      return this.theme.techPosts.map(post => ({
        title: post.title,
        date: post.date,
        href: post.href,
        avatar: post.avatar,
        description: post.description,
        tags: post.tags || [],
      }))
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.articles.length / PAGE_SIZE))
    },
    articleBoxMinItems() {
      return this.totalPages > 1 ? PAGE_SIZE : 0
    },
    currentPage() {
      if (this.page < 1 || isNaN(this.page)) return 1
      if (this.page > this.totalPages) return this.totalPages
      return this.page
    },
    paginatedArticles() {
      const start = (this.currentPage - 1) * PAGE_SIZE
      return this.articles.slice(start, start + PAGE_SIZE)
    },
  },
  methods: {
    handlePageChange(page) {
      this.page = page
      window.history.pushState({}, '', `?page=${page}`)
      window.scrollTo(0, 0)
    },
  },
}
</script>
