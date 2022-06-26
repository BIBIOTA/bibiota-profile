<template>
  <div>
    <div class="border-2 rounded-md m-2">
      <h1 class="article_title">
        {{ frontmatter.title }}
      </h1>
      <div class="article_date">
        {{ moment(frontmatter.date).format('YYYY-MM-DD') }}
      </div>
    </div>
    <div class="p-2">
      <figure>
        <img class="mx-auto" :src="frontmatter.avatar" :alt="frontmatter.title">
      </figure>
    </div>
  </div>
</template>
<script>
import { useData } from 'vitepress'
import moment from 'moment'

export default {
  setup() {
    const { frontmatter } = useData();
    return {
      frontmatter,
      moment,
    }
  },
}
</script>
