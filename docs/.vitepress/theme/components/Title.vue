<template>
  <div class="py-6">
    <h1 class="page_title">
      {{ text }}
    </h1>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
}
</script>