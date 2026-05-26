<template>
  <div>
    <div class="border-2 rounded-md m-2">
      <h1
        v-html="formattedTitle"
        class="article_title"
      />
      <div class="article_date">
        {{ moment(frontmatter.date).format('YYYY-MM-DD') }}
      </div>
    </div>
    <div v-if="frontmatter.avatar" class="p-2">
      <figure>
        <ZoomImg :src="withBase(frontmatter.avatar)" :alt="frontmatter.title" />
      </figure>
    </div>
  </div>
</template>
<script>
import { useData, withBase } from 'vitepress'
import moment from 'moment'

export default {
  setup() {
    const { frontmatter } = useData();
    return {
      frontmatter,
      moment,
    }
  },
  computed: {
    formattedTitle() {
      return this.frontmatter.title.replace(/^(\[.+?\])\s+/, '$1<br>')
    },
  },
  methods: {
    withBase,
  },
}
</script>
