import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const mode = process.env.APP_ENV || 'development'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
            target: mode=='development' ? 'http://localhost:8000':'https://0e7q8dg175.execute-api.ap-southeast-1.amazonaws.com/prod',
            changeOrigin: true,
      }
    }
  },
})
