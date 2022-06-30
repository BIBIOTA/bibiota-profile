<template>
  <div class="flex flex-wrap justify-center py-2 px-14">
    <template v-if="articles.length > 0">
      <div
        class="article_box"
        v-for="(article, i) in articles" :key="`article_${i}`"
      >
        <a :href="article.href">
          <figure>
            <img :src="article.avatar" alt="">
          </figure>
          <div class="p-4">
            <div class="article_title">
              {{ article.title }}
            </div>
            <div class="py-2 font-light">
              {{ moment(article.date.time).format('YYYY-MM-DD') }}
            </div>
          </div>
        </a>
      </div>
    </template>
    <template v-else>
      <div class="m-16 pt-4 px-10 text-center">
        <h2 class="whitespace-nowrap">
          Not Found... <br /> Coming soon...
        </h2>
      </div>
    </template>
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