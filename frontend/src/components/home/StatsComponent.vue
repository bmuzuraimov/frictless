<template>
  <section class="py-14">
    <div class="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <h3 class="text-gray-800 text-3xl font-semibold sm:text-4xl">
          Our customers are always happy
        </h3>
        <p class="mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis sollicitudin quam
          ut tincidunt.
        </p>
      </div>
      <div class="mt-12">
        <ul
          class="flex flex-col items-center justify-center gap-y-10 sm:flex-row sm:flex-wrap lg:divide-x"
        >
          <li v-for="(item, index) in stats" :key="index" class="text-center px-12 md:px-16">
            <h4 class="text-4xl text-indigo-600 font-semibold">
              {{ item.data }}
            </h4>
            <p class="mt-3 font-medium">
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
        { data: '35K', title: 'Customers' },
        { data: '10K+', title: 'Downloads' },
        { data: '40+', title: 'Countries' },
        { data: '30M+', title: 'Total revenue' }
      ]
    }
  }
}
</script>

<style>
</style>