<template>
  <section class="py-12 sm:py-16 mb-8 sm:mb-12">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600">
      <div class="max-w-3xl mx-auto text-center">
        <h3 class="text-3xl sm:text-4xl font-ourfit text-secondary-800 font-semibold">
          Proven Results
        </h3>
      </div>
      <div class="mt-8 sm:mt-12 lg:mt-16">
        <ul
          class="flex flex-col items-center justify-center gap-y-8 sm:gap-8 md:gap-y-10 sm:flex-row sm:flex-wrap lg:divide-x lg:divide-gray-400"
        >
          <li
            v-for="(item, index) in stats"
            :key="index"
            class="text-center px-6 sm:px-8 md:px-10 lg:px-12"
          >
            <h4 class="text-xl sm:text-2xl lg:text-3xl font-ourfit text-info-800 font-semibold">
              {{ item.data }}
            </h4>
            <p class="mt-2 sm:mt-3 font-ourfit font-medium">
              {{ item.title }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    const stats = ref([
      { data: '1 Users', title: 'joined' },
      { data: '433 tasks', title: 'scheduled' },
      { data: '97 Hours', title: 'saved' },
      { data: '3X', title: 'productivity boost' }
    ])
    return {
      stats
    }
  }
}
</script>
