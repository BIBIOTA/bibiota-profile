<template>
  <div class="flex flex-wrap justify-center py-2 px-2">
    <div
      class="max-w-sm m-2 text-center shadow-xl"
      v-for="(article, i) in articles" :key="`article_${i}`"
    >
      <a :href="article.href">
        <figure>
          <img :src="article.avatar" alt="">
        </figure>
        <div class="py-2 font-medium">
          {{ article.title }}
        </div>
        <div class="py-2 font-light">
          {{ moment(article.date.time).format('YYYY-MM-DD') }}
        </div>
      </a>
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  setup() {
    return {
      moment,
    }
  },
  props: {
    articles: {
      type: Array,
      required: true,
    },
  },
}
</script>