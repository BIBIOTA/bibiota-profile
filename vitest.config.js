import { defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    // 排除暫存 git worktree 內的過期測試副本
    exclude: [...configDefaults.exclude, '**/.claude/**'],
  },
  resolve: {
    alias: {
      '@theme': path.resolve(__dirname, 'docs/.vitepress/theme'),
      'vitepress': path.resolve(__dirname, 'tests/unit/__mocks__/vitepress.js'),
    },
  },
})
