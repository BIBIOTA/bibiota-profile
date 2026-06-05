<template>
  <div v-if="totalPages > 1" data-testid="pagination" class="flex items-center justify-center gap-1 mt-6">
    <button
      data-testid="prev-btn"
      :disabled="currentPage === 1"
      class="px-3 py-1.5 rounded text-sm"
      :style="currentPage === 1 ? { color: '#A6A6B2', cursor: 'default' } : { color: '#1A1A1F', cursor: 'pointer' }"
      @click="currentPage > 1 && $emit('change', currentPage - 1)"
    >
      ← 上一頁
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      :data-testid="`page-btn-${page}`"
      :data-active="page === currentPage ? 'true' : 'false'"
      class="px-3 py-1.5 rounded text-sm"
      :style="page === currentPage
        ? { backgroundColor: '#334DCC', color: '#ffffff' }
        : { backgroundColor: '#EDECF2', color: '#1A1A1F' }"
      @click="$emit('change', page)"
    >
      {{ page }}
    </button>

    <button
      data-testid="next-btn"
      :disabled="currentPage === totalPages"
      class="px-3 py-1.5 rounded text-sm"
      :style="currentPage === totalPages ? { color: '#A6A6B2', cursor: 'default' } : { color: '#1A1A1F', cursor: 'pointer' }"
      @click="currentPage < totalPages && $emit('change', currentPage + 1)"
    >
      下一頁 →
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ['change'],
}
</script>
