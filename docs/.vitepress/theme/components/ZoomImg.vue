<script setup>
import { withBase } from 'vitepress'
import { onMounted, ref } from 'vue'
import mediumZoom from 'medium-zoom'

defineProps({
    src: String,
    alt: String,
})

const imgRef = ref(null)

onMounted(() => {
    mediumZoom(imgRef.value, { background: 'var(--vp-c-bg)' });
})
</script>

<template>
    <img ref="imgRef" class="py-2" :src="withBase(src)" :alt="alt">
</template>

<style>
.medium-zoom-overlay {
    z-index: 20;
}
.medium-zoom-image {
    z-index: 21;
}
</style>
