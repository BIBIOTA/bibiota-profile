import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      '@theme': path.resolve(__dirname, 'docs/.vitepress/theme'),
      'vitepress': path.resolve(__dirname, 'tests/unit/__mocks__/vitepress.js'),
    },
  },
})
