import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { nextTick } from 'vue'
import TechArticleList from '@theme/TechArticleList.vue'
import { setMockPosts } from './__mocks__/vitepress.js'

function makePosts(n) {
  return Array.from({ length: n }, (_, i) => ({
    title: `Article ${i + 1}`,
    date: { time: Date.now() - i * 86400000 },
    href: `/tech/posts/article-${i + 1}.html`,
    avatar: null,
    description: `Description ${i + 1}`,
    tags: [],
  }))
}

function setLocationSearch(search) {
  Object.defineProperty(window, 'location', {
    value: { search },
    writable: true,
    configurable: true,
  })
}

beforeEach(() => {
  setMockPosts([])
  setLocationSearch('')
  vi.restoreAllMocks()
})

describe('TechArticleList - URL param parsing', () => {
  it('Page loads with no query param', async () => {
    setMockPosts(makePosts(17))
    setLocationSearch('')
    const wrapper = mount(TechArticleList)
    await nextTick()
    expect(wrapper.vm.currentPage).toBe(1)
  })

  it('Page loads with valid query param', async () => {
    setMockPosts(makePosts(17))
    setLocationSearch('?page=2')
    const wrapper = mount(TechArticleList)
    await nextTick()
    expect(wrapper.vm.currentPage).toBe(2)
  })

  it('Page param is zero or negative', async () => {
    setMockPosts(makePosts(17))

    setLocationSearch('?page=0')
    const w1 = mount(TechArticleList)
    await nextTick()
    expect(w1.vm.currentPage).toBe(1)

    setLocationSearch('?page=-5')
    const w2 = mount(TechArticleList)
    await nextTick()
    expect(w2.vm.currentPage).toBe(1)
  })

  it('Page param exceeds total pages', async () => {
    setMockPosts(makePosts(17)) // totalPages = 2
    setLocationSearch('?page=999')
    const wrapper = mount(TechArticleList)
    await nextTick()
    expect(wrapper.vm.currentPage).toBe(2)
  })

  it('Page param is non-numeric', async () => {
    setMockPosts(makePosts(17))
    setLocationSearch('?page=abc')
    const wrapper = mount(TechArticleList)
    await nextTick()
    expect(wrapper.vm.currentPage).toBe(1)
  })
})

describe('TechArticleList - article slicing', () => {
  it('First page shows articles 1–10', async () => {
    const posts = makePosts(17)
    setMockPosts(posts)
    setLocationSearch('')
    const wrapper = mount(TechArticleList)
    await nextTick()
    expect(wrapper.vm.paginatedArticles).toHaveLength(10)
    expect(wrapper.vm.paginatedArticles[0].title).toBe('Article 1')
    expect(wrapper.vm.paginatedArticles[9].title).toBe('Article 10')
  })

  it('Second page shows articles 11–17', async () => {
    const posts = makePosts(17)
    setMockPosts(posts)
    setLocationSearch('?page=2')
    const wrapper = mount(TechArticleList)
    await nextTick()
    expect(wrapper.vm.paginatedArticles).toHaveLength(7)
    expect(wrapper.vm.paginatedArticles[0].title).toBe('Article 11')
    expect(wrapper.vm.paginatedArticles[6].title).toBe('Article 17')
  })
})

describe('TechArticleList - SSR safety', () => {
  it('SSR build does not access window', async () => {
    setMockPosts(makePosts(5))
    const originalLocation = window.location
    Object.defineProperty(window, 'location', {
      value: undefined,
      writable: true,
      configurable: true,
    })
    let mounted = false
    try {
      const wrapper = mount(TechArticleList)
      mounted = true
      expect(wrapper.vm.$data.page).toBe(1)
    } finally {
      Object.defineProperty(window, 'location', {
        value: originalLocation,
        writable: true,
        configurable: true,
      })
    }
    expect(mounted).toBe(true)
  })
})

describe('TechArticleList - handlePageChange', () => {
  it('User clicks a page button', async () => {
    setMockPosts(makePosts(17))
    setLocationSearch('')
    const pushStateSpy = vi.spyOn(window.history, 'pushState')
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

    const wrapper = mount(TechArticleList)
    await nextTick()

    wrapper.vm.handlePageChange(2)
    await nextTick()

    expect(wrapper.vm.currentPage).toBe(2)
    expect(pushStateSpy).toHaveBeenCalledWith({}, '', '?page=2')
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0)
  })
})

function makeMetaPosts() {
  return [
    { title: 'Kubernetes 入門', description: '容器編排', href: 'posts/k8s.html', avatar: null, date: { time: 5 }, tags: [], excerpt: '' },
    { title: 'Docker 筆記', description: '搭配 kubernetes 使用', href: 'posts/docker.html', avatar: null, date: { time: 4 }, tags: [], excerpt: '' },
    { title: 'Redis 快取', description: '記憶體資料庫', href: 'posts/redis.html', avatar: null, date: { time: 3 }, tags: [], excerpt: '這篇內文提到 kubernetes 但標題與描述沒有' },
    { title: 'CI/CD 流程', description: '自動化部署', href: 'posts/cicd.html', avatar: null, date: { time: 2 }, tags: [], excerpt: '' },
  ]
}

describe('TechArticleList - 搜尋', () => {
  it('關鍵字為空', async () => {
    setMockPosts(makeMetaPosts())
    const wrapper = mount(TechArticleList)
    await nextTick()

    wrapper.vm.query = '   '
    await nextTick()

    expect(wrapper.vm.articles).toHaveLength(4)
  })

  it('關鍵字命中', async () => {
    setMockPosts(makeMetaPosts())
    const wrapper = mount(TechArticleList)
    await nextTick()

    wrapper.vm.page = 2
    // 大小寫無關：以大寫關鍵字比對小寫標題／描述
    wrapper.vm.query = 'KUBERNETES'
    await nextTick()

    const titles = wrapper.vm.articles.map((a) => a.title)
    expect(titles).toContain('Kubernetes 入門') // 標題命中
    expect(titles).toContain('Docker 筆記')     // 描述命中
    // 關鍵字僅在內文（excerpt）出現者不應命中
    expect(titles).not.toContain('Redis 快取')
    expect(titles).not.toContain('CI/CD 流程')
    expect(wrapper.vm.articles).toHaveLength(2)
    // 搜尋後分頁重設回第 1 頁
    expect(wrapper.vm.page).toBe(1)
  })

  it('查無結果', async () => {
    setMockPosts(makeMetaPosts())
    const wrapper = mount(TechArticleList)
    await nextTick()

    wrapper.vm.query = '完全不存在的關鍵字xyz'
    await nextTick()

    expect(wrapper.vm.articles).toHaveLength(0)
    expect(wrapper.vm.showNoResults).toBe(true)
  })
})
