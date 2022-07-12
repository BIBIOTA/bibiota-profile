<template>
  <div
    @click="scrollToTop"
    class="scroll_btn scroll_btn_size scroll_btn_border scroll_btn_opacity scroll_btn_fixed"
    :class="isShow ? 'opacity-100' : 'opacity-0'"
  >
    <span>
      ⬆
    </span>
  </div>
</template>
<script>
export default {
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  data () {
    return {
      isShow: false,
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    handleScroll () {
      if (window.scrollY > 2000) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
}
</script>
<style lang="sass">
  .scroll_btn
    @apply flex justify-center items-center cursor-pointer
  .scroll_btn_size
    @apply w-12 h-12 sm:w-16 sm:h-16 md:w-16 md:h-16
  .scroll_btn_border
    @apply border-2 rounded-full shadow-xl
  .scroll_btn_opacity
    @apply transition-opacity
  .scroll_btn_fixed
    @apply fixed bottom-10 right-2/4 translate-x-2/4 md:translate-x-0 md:right-20 lg:right-32 
  .scroll_btn span
    @apply text-3xl sm:text-4xl md:text-5xl text-gray-400 font-bold
</style>