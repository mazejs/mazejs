/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': new URL('./src/components', import.meta.url).pathname,
      '@': new URL('./src/', import.meta.url).pathname,
      '@layouts': new URL('./src/layouts', import.meta.url).pathname,
      '@pages': new URL('./src/pages', import.meta.url).pathname,
      '@router': new URL('./src/router', import.meta.url).pathname,
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    includeSource: ['src/**/*.{src/**/*.{js, ts, tsx, vue}']
  },
})
