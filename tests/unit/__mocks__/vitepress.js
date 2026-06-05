import { ref } from 'vue'

export const useData = () => ({
  theme: ref({ techPosts: [] }),
})

export const useRoute = () => ({
  path: ref('/tech/'),
})
