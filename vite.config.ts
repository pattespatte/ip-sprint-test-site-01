import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Get repository name from environment or use default
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'ip-sprint-test-site-01'

export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Add FKUI's SCSS variables and mixins
        additionalData: `@use "@fkui/design/src/core" as *;`
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          fkui: ['@fkui/vue', '@fkui/design', '@fkui/logic', '@fkui/theme-default', '@fkui/date']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true // This allows access from host machine to VM
  }
})