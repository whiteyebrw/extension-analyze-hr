import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: {
        index: './index.html',
        background: './src/chrome/background/index.ts',
        content: './src/chrome/content/index.ts',
        messageBus: './src/chrome/messageBus/index.ts',
      },
      output: {
        entryFileNames: `js/[name].js`
      }
    }
  },
})
