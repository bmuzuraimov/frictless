<template>
  <section class="py-16 mb-12">
    <div class="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <h3 class="text-4xl font-ourfit text-secondary-800 font-semibold">Proven Results</h3>
      </div>
      <div class="mt-12">
        <ul
          class="flex flex-col items-center justify-center gap-y-10 sm:flex-row sm:flex-wrap lg:divide-x"
        >
          <li v-for="(item, index) in stats" :key="index" class="text-center px-12 md:px-16">
            <h4 class="text-2xl font-ourfit text-info-800 font-semibold">
              {{ item.data }}
            </h4>
            <p class="mt-3 font-ourfit font-medium">
              {{ item.title }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  data() {
    return {
      stats: [
        { data: '1 Users', title: 'joined' },
        { data: '433 tasks', title: 'scheduled' },
        { data: '97 Hours', title: 'saved' },
        { data: '3X', title: 'productivity boost' },
      ]
    }
  }
}
</script>

<style></style>
