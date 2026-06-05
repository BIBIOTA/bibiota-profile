<template>
  <div class="rounded-2xl px-4 py-3" style="background:#F7F7FA">
    <template v-for="(item, i) in paddedItems" :key="`article_${i}`">

      <!-- Real article -->
      <a
        v-if="item"
        :href="item.href"
        class="block no-underline"
        data-testid="article-row"
      >
        <div class="flex items-center gap-4 bg-white rounded-xl py-5 px-4">

          <!-- Thumbnail -->
          <div
            class="flex-shrink-0 rounded-lg overflow-hidden"
            style="width:96px;height:72px;"
          >
            <img
              v-if="item.avatar"
              :src="item.avatar"
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
            <div
              class="text-sm font-semibold leading-snug"
              style="color:#1A1A1F"
              v-html="item.title"
            />
            <div
              v-if="item.description"
              class="text-xs leading-snug line-clamp-2"
              style="color:#737378"
            >
              {{ item.description }}
            </div>
            <div class="flex items-center justify-between mt-1">
              <div class="flex gap-1 flex-wrap">
                <span
                  v-for="tag in (item.tags || []).slice(0, 2)"
                  :key="tag"
                  class="text-xs px-2 py-0.5 rounded"
                  :style="tagStyle(tag)"
                >
                  {{ tag }}
                </span>
              </div>
              <span class="text-xs flex-shrink-0 ml-2" style="color:#A6A6B2">
                {{ moment(item.date.time).format('YYYY-MM-DD') }}
              </span>
            </div>
          </div>

        </div>
      </a>

      <!-- Invisible placeholder (maintains height when page has fewer than minItems articles) -->
      <div
        v-else
        class="flex items-center gap-4 bg-white rounded-xl py-5 px-4"
        style="visibility:hidden"
        aria-hidden="true"
        data-testid="placeholder-row"
      >
        <div class="flex-shrink-0 rounded-lg overflow-hidden" style="width:96px;height:72px;">
          <div class="w-full h-full" style="background:#EDECF2" />
        </div>
        <div class="flex-1 flex flex-col gap-1 min-w-0 pr-3">
          <div class="text-sm font-semibold leading-snug">-</div>
          <div class="text-xs leading-snug line-clamp-2">-</div>
          <div class="flex items-center justify-between mt-1">
            <div class="flex gap-1 flex-wrap">
              <span class="text-xs px-2 py-0.5 rounded">-</span>
            </div>
            <span class="text-xs flex-shrink-0 ml-2">0000-00-00</span>
          </div>
        </div>
      </div>

      <!-- Divider: only between real articles -->
      <div
        v-if="i < paddedItems.length - 1"
        class="py-2 mx-4"
        :style="i < articles.length - 1 ? '' : 'visibility:hidden'"
      >
        <div style="height:1px;background:#E6E6EB" />
      </div>

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
    minItems: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    paddedItems() {
      const count = Math.max(this.articles.length, this.minItems)
      const result = [...this.articles]
      while (result.length < count) result.push(null)
      return result
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
