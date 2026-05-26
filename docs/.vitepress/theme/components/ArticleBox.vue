<template>
  <div class="rounded-2xl px-6 py-4" style="background:#F7F7FA">
    <template v-for="(article, i) in articles" :key="`article_${i}`">
      <a :href="article.href" class="block no-underline">
        <div class="flex items-center gap-4 bg-white rounded-xl py-4">

          <!-- Thumbnail -->
          <div
            class="flex-shrink-0 rounded-lg overflow-hidden"
            style="width:96px;height:72px;"
          >
            <img
              v-if="article.avatar"
              :src="article.avatar"
              alt=""
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full"
              style="background:#EDECF2"
            />
          </div>

          <!-- Text column -->
          <div class="flex-1 flex flex-col gap-1 min-w-0 pr-3">

            <!-- Title -->
            <div
              class="text-sm font-semibold leading-snug"
              style="color:#1A1A1F"
              v-html="article.title"
            />

            <!-- Description -->
            <div
              v-if="article.description"
              class="text-xs leading-snug line-clamp-2"
              style="color:#737378"
            >
              {{ article.description }}
            </div>

            <!-- Meta row: tags + date -->
            <div class="flex items-center justify-between mt-1">
              <!-- Tags -->
              <div class="flex gap-1 flex-wrap">
                <span
                  v-for="tag in (article.tags || []).slice(0, 2)"
                  :key="tag"
                  class="text-xs px-2 py-0.5 rounded"
                  :style="tagStyle(tag)"
                >
                  {{ tag }}
                </span>
              </div>
              <!-- Date -->
              <span class="text-xs flex-shrink-0 ml-2" style="color:#A6A6B2">
                {{ moment(article.date.time).format('YYYY-MM-DD') }}
              </span>
            </div>

          </div>
        </div>
      </a>

      <!-- Divider (between rows, not after last) -->
      <div
        v-if="i < articles.length - 1"
        class="w-full"
        style="height:1px;background:#E6E6EB"
      />
    </template>
  </div>
</template>

<script>
import moment from 'moment'

const TAG_COLORS = {
  'Interview': { bg: '#E6EEFF', text: '#334DCC' },
  'Backend':   { bg: '#E6EEFF', text: '#334DCC' },
  'Algorithm': { bg: '#E0F7F4', text: '#0D8070' },
  'Travel':    { bg: '#FFF0E0', text: '#BF4D08' },
  '朝聖之路':  { bg: '#FFF0E0', text: '#BF4D08' },
}
const DEFAULT_TAG = { bg: '#EDECF2', text: '#666670' }

export default {
  setup() {
    return { moment }
  },
  props: {
    articles: {
      type: Array,
      required: true,
    },
  },
  methods: {
    tagStyle(tag) {
      const c = TAG_COLORS[tag] || DEFAULT_TAG
      return { backgroundColor: c.bg, color: c.text }
    },
  },
}
</script>
