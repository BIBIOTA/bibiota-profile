import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Pagination from '@theme/components/Pagination.vue'

describe('Pagination', () => {
  it('Pagination hidden when articles fit on one page', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 1, totalPages: 1 },
    })
    expect(wrapper.find('[data-testid="pagination"]').exists()).toBe(false)
  })

  it('Pagination shown when articles exceed one page', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 1, totalPages: 3 },
    })
    expect(wrapper.find('[data-testid="pagination"]').exists()).toBe(true)
  })

  it('Previous button disabled on first page', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 1, totalPages: 3 },
    })
    const prev = wrapper.find('[data-testid="prev-btn"]')
    expect(prev.attributes('disabled')).toBeDefined()
  })

  it('Next button disabled on last page', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 3, totalPages: 3 },
    })
    const next = wrapper.find('[data-testid="next-btn"]')
    expect(next.attributes('disabled')).toBeDefined()
  })

  it('Active page button is visually distinct', () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 2, totalPages: 3 },
    })
    expect(wrapper.find('[data-testid="page-btn-2"][data-active="true"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="page-btn-1"][data-active="true"]').exists()).toBe(false)
  })

  it('emits change with target page when page button clicked', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 1, totalPages: 3 },
    })
    await wrapper.find('[data-testid="page-btn-2"]').trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')[0]).toEqual([2])
  })

  it('emits change with previous page when Previous clicked', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 2, totalPages: 3 },
    })
    await wrapper.find('[data-testid="prev-btn"]').trigger('click')
    expect(wrapper.emitted('change')[0]).toEqual([1])
  })

  it('emits change with next page when Next clicked', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 2, totalPages: 3 },
    })
    await wrapper.find('[data-testid="next-btn"]').trigger('click')
    expect(wrapper.emitted('change')[0]).toEqual([3])
  })
})
