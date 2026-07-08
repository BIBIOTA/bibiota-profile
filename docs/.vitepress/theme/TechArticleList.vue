<template>
  <div class="w-[760px] max-w-full">
    <Title :text="articleTitle" />

    <div class="mb-4 relative">
      <svg
        class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
        width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="#9A9AA5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="search"
        data-testid="article-search"
        class="w-full rounded-xl border pl-11 pr-4 py-3 text-sm outline-none transition-colors placeholder:text-[#9A9AA5] focus:border-[#B4232A]"
        style="background:#FFFFFF; border-color:#E2E2E8; color:#1A1A1F"
        :placeholder="searchPlaceholder"
        @focus="loadSearchIndex"
        @input="onInput"
      />
    </div>

    <p
      v-if="indexError && isSearching"
      class="mb-3 text-sm"
      style="color:#B4232A"
    >
      搜尋暫時無法使用，已顯示全部文章
    </p>

    <p
      v-if="isLoadingResults"
      class="py-8 text-center text-sm"
      style="color:#6B6B76"
    >
      搜尋中…
    </p>

    <p
      v-else-if="showNoResults"
      class="py-8 text-center text-sm"
      style="color:#6B6B76"
    >
      找不到符合的文章
    </p>

    <template v-else>
      <ArticleBox :articles="paginatedArticles" :min-items="articleBoxMinItems" />
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @change="handlePageChange"
      />
    </template>
  </div>
</template>
<script>
import Title from '@theme/components/Title.vue'
import ArticleBox from '@theme/components/ArticleBox.vue'
import Pagination from '@theme/components/Pagination.vue'
import { useRoute, useData } from 'vitepress'

const PAGE_SIZE = 10
const SEARCH_INDEX_URL = '/tech-search-index.json'
const DEBOUNCE_MS = 200

function toArticle(item) {
  return {
    title: item.title,
    date: item.date,
    href: item.href,
    avatar: item.avatar,
    description: item.description,
    tags: item.tags || [],
  }
}

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
    const searchPlaceholder = '搜尋文章（標題、描述、內文）';

    return {
      articleTitle,
      searchPlaceholder,
      path,
      theme,
    }
  },
  data() {
    return {
      page: 1,
      query: '',
      searchIndex: null,
      indexRequested: false,
      indexLoading: false,
      indexError: false,
    }
  },
  mounted() {
    if (typeof window === 'undefined' || !window.location) return
    const params = new URLSearchParams(window.location.search)
    const raw = parseInt(params.get('page'), 10)
    this.page = isNaN(raw) ? 1 : raw
  },
  watch: {
    query() {
      // 關鍵字變動時分頁重設回第 1 頁，並確保索引已載入
      this.page = 1
      this.loadSearchIndex()
    },
  },
  computed: {
    baseArticles() {
      if (!this.theme.techPosts) return []
      return this.theme.techPosts.map(toArticle)
    },
    normalizedQuery() {
      return (this.query || '').trim().toLowerCase()
    },
    isSearching() {
      return this.normalizedQuery !== ''
    },
    searchResults() {
      if (!this.searchIndex) return []
      const q = this.normalizedQuery
      return this.searchIndex
        .filter(item =>
          (item.title || '').toLowerCase().includes(q) ||
          (item.description || '').toLowerCase().includes(q) ||
          (item.content || '').toLowerCase().includes(q)
        )
        .map(toArticle)
    },
    articles() {
      // 搜尋中且索引可用時顯示過濾結果；否則回退到完整列表
      if (this.isSearching && this.searchIndex && !this.indexError) {
        return this.searchResults
      }
      return this.baseArticles
    },
    isLoadingResults() {
      return this.isSearching && this.indexLoading && !this.searchIndex
    },
    showNoResults() {
      return (
        this.isSearching &&
        !this.indexLoading &&
        !this.indexError &&
        !!this.searchIndex &&
        this.searchResults.length === 0
      )
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
    async loadSearchIndex() {
      if (this.indexRequested) return
      if (typeof window === 'undefined') return
      this.indexRequested = true
      this.indexLoading = true
      this.indexError = false
      try {
        const res = await fetch(SEARCH_INDEX_URL)
        if (!res || !res.ok) throw new Error('failed to load search index')
        this.searchIndex = await res.json()
      } catch (err) {
        this.indexError = true
        this.searchIndex = null
      } finally {
        this.indexLoading = false
      }
    },
    onInput(event) {
      const value = event.target.value
      this.loadSearchIndex()
      clearTimeout(this._debounceTimer)
      this._debounceTimer = setTimeout(() => {
        this.query = value
      }, DEBOUNCE_MS)
    },
    handlePageChange(page) {
      this.page = page
      window.history.pushState({}, '', `?page=${page}`)
      window.scrollTo(0, 0)
    },
  },
}
</script>
