import { ref } from 'vue'

const mockTheme = ref({ techPosts: [] })

export const useData = () => ({
  theme: mockTheme,
})

export const useRoute = () => ({
  path: ref('/tech/'),
})

export function setMockPosts(posts) {
  mockTheme.value = { techPosts: posts }
}
