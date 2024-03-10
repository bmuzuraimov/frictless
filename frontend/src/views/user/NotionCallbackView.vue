<template>
  <div class="flex space-x-2 justify-center items-center bg-white h-screen">
    <span class="sr-only">Loading...</span>
    <div class="h-6 w-6 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div class="h-6 w-6 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div class="h-6 w-6 bg-black rounded-full animate-bounce"></div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/common/authStore'
import { useNotionStore } from '@/stores/notion/useNotionStore'

export default defineComponent({
  setup() {
    const route = useRoute()
    const authStore = useAuthStore()
    const notionStore = useNotionStore()

    const code = ref(route.query.code as string | undefined)

    onMounted(() => {
      if (code.value) {
        notionStore.getAccessToken({
          userId: authStore.user._id,
          code: code.value,
          redirect_uri: import.meta.env.VITE_NOTION_REDIRECT_URI
        })
      }
    })
  }
})
</script>
