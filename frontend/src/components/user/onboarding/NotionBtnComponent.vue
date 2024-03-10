<template>
  <v-btn
    density="comfortable"
    size="x-large"
    rounded="xl"
    variant="outlined"
    elevation="2"
    @click="handleNotionOauth2()"
    :class="[
      'flex',
      'mt-4',
      'flex-row',
      'items-center',
      'justify-center',
      'p-5',
      'rounded-lg',
      'border',
      'hover:bg-gray-50'
    ]"
  >
    <img src="@/assets/images/notion.png" class="w-8 h-8 mr-2" />
    <span class="text-lg fonr-mont">{{ notionButtonText }}</span>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useNotionStore } from '@/stores/notion/useNotionStore';

export default defineComponent({
  setup() {
    const notionStore = useNotionStore();

    const notionButtonText = computed(() => notionStore.button.text);

    const handleNotionOauth2 = () => {
      notionStore.handleNotionOauth2();
    };

    return {
      notionButtonText,
      handleNotionOauth2,
    };
  },
});
</script>
