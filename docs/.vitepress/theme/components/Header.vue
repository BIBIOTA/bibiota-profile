<template>
  <div class="header_container">
    <div class="index_link">
      <a href="/" class="border-2 border-double border-black p-4">
        <span>
          {{ theme.title }}
        </span>
      </a>
    </div>
    <nav class="nav">
      <a
        v-for="(item) in theme.nav"
        :key="item.link"
        :href="item.link"
        @click="changeRoute(item.link)"
        class="nav_link border-b-2"
        :class="{ 'border-black': path === item.link }"
      >
        {{ item.text }}
      </a>
    </nav>
  </div>
</template>
<script>
import { useRouter } from 'vitepress'

export default {
  props: {
    theme: {
      type: Object,
    },
  },
  setup() {
    const { route } = useRouter();
    const { path } = route;
    return {
      path,
    };
  },
  methods: {
    changeRoute(path) {
      this.path = path;
    },
  },
}
</script>
<style lang="sass">
  .header_container
    @apply flex justify-between items-center p-10 tracking-widest
  .index_link
    @apply text-lg md:text-xl lg:text-2xl font-light lg:pl-20
  .nav
    @apply px-4 md:px-0 space-y-2 md:space-y-0 md:space-x-3 md:flex
  .nav_link
    @apply px-4 py-2 md:py-1 md:px-3 font-light tracking-widest
</style>