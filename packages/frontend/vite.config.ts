import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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