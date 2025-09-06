<template>
  <div id="resume-app">
    <FinalResume />
  </div>
</template>

<script setup>
import FinalResume from './FinalResume.vue'
</script>

<style>
html, body {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  line-height: 1.6;
  background-color: #f4f5f7 !important;
  color: #1f2937 !important;
  min-height: 100vh;
}

#resume-app {
  min-height: 100vh;
}

::selection {
  background-color: #3b82f6;
  color: white;
}

::-moz-selection {
  background-color: #3b82f6;
  color: white;
}
</style>