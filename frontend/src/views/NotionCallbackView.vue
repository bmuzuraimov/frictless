<template>
  <div class="flex space-x-2 justify-center items-center bg-white h-screen">
    <span class="sr-only">Loading...</span>
    <div class="h-6 w-6 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div class="h-6 w-6 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div class="h-6 w-6 bg-black rounded-full animate-bounce"></div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'

export default {
  data() {
    return {
      overlay: true,
      code: this.$route.query.code,
    }
  },
  mounted() {
    this.getAccessToken()
  },
  methods: {
    async getAccessToken() {
      try {
        const response = await axios.post('/api/notion_callback', {
          userId: this.$userDecoded.userId,
          code: this.code,
          redirect_uri: import.meta.env.VITE_NOTION_REDIRECT_URI
        })
        const { success, access_token, parent_id } = response.data;
        localStorage.setItem('notionAccessToken', access_token);
        localStorage.setItem('notionParentId', parent_id);
        localStorage.setItem('notionAuthStatus', success ? 'success' : 'failed');
        localStorage.setItem('notionAuthTab', 'false');
        window.close()
      } catch (error) {
        localStorage.setItem('notionAuthStatus', 'failed');
        localStorage.setItem('notionAuthTab', 'false');
        window.close();
        throw error
      }
    }
  }
}
</script>

<style>
</style>