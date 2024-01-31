import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

console.log(process.env.VITE_BACKEND_URL);
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
            target: 'https://0e7q8dg175.execute-api.ap-southeast-1.amazonaws.com/prod',
            changeOrigin: true,
      }
    }
  },
})
