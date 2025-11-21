import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
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
  server: {
    port: 5173,
    host: true // This allows access from host machine to VM
  }
})