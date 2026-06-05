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
