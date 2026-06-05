import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ArticleBox from '@theme/components/ArticleBox.vue'

function makeArticles(n) {
  return Array.from({ length: n }, (_, i) => ({
    title: `Article ${i + 1}`,
    date: { time: Date.now() - i * 86400000 },
    href: `/tech/posts/article-${i + 1}.html`,
    avatar: null,
    description: `Description ${i + 1}`,
    tags: [],
  }))
}

describe('ArticleBox - placeholder rows', () => {
  it('renders no placeholders when articles.length >= minItems', () => {
    const wrapper = mount(ArticleBox, {
      props: { articles: makeArticles(10), minItems: 10 },
    })
    expect(wrapper.findAll('[data-testid="placeholder-row"]').length).toBe(0)
    expect(wrapper.findAll('[data-testid="article-row"]').length).toBe(10)
  })

  it('renders invisible placeholder rows when articles.length < minItems', () => {
    const wrapper = mount(ArticleBox, {
      props: { articles: makeArticles(4), minItems: 10 },
    })
    expect(wrapper.findAll('[data-testid="article-row"]').length).toBe(4)
    const placeholders = wrapper.findAll('[data-testid="placeholder-row"]')
    expect(placeholders.length).toBe(6)
    placeholders.forEach(p => {
      expect(p.attributes('style')).toContain('visibility:hidden')
    })
  })

  it('placeholder rows have no href (are not clickable links)', () => {
    const wrapper = mount(ArticleBox, {
      props: { articles: makeArticles(2), minItems: 5 },
    })
    const placeholders = wrapper.findAll('[data-testid="placeholder-row"]')
    placeholders.forEach(p => {
      expect(p.attributes('href')).toBeUndefined()
    })
  })

  it('renders no placeholders when minItems is 0 (default)', () => {
    const wrapper = mount(ArticleBox, {
      props: { articles: makeArticles(3) },
    })
    expect(wrapper.findAll('[data-testid="placeholder-row"]').length).toBe(0)
  })
})
