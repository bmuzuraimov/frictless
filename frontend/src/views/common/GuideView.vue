<template>
  <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <v-breadcrumbs :items="items">
      <template v-slot:title="{ item }">
        {{ item.title }}
      </template>
    </v-breadcrumbs>
    <div class="text-center mb-12">
      <h1 class="text-3xl sm:text-4xl font-ourfit text-secondary-800 font-semibold">Guide to Using Our SaaS Platform</h1>
      <p class="mt-3 text-lg sm:text-xl font-ourfit leading-normal text-gray-600">Everything you need to know to get started and make the most of our platform.</p>
    </div>

    <div class="space-y-8">
      <!-- Getting Started -->
      <section id="getting-started" class="pt-4">
        <h2 class="text-3xl font-semibold text-primary-600">Getting Started</h2>
        <p class="mt-2 text-lg text-gray-600">A step-by-step guide to signing up and setting up your account.</p>
        <!-- Content -->
      </section>

      <!-- Features Overview -->
      <section id="features" class="pt-4">
        <h2 class="text-3xl font-semibold text-primary-600">Features Overview</h2>
        <p class="mt-2 text-lg text-gray-600">Explore the key features of our platform and how they can benefit you.</p>
        <!-- Content -->
      </section>

      <!-- Best Practices -->
      <section id="best-practices" class="pt-4">
        <h2 class="text-3xl font-semibold text-primary-600">Best Practices</h2>
        <p class="mt-2 text-lg text-gray-600">Tips and tricks for maximizing productivity and efficiency.</p>
        <!-- Content -->
      </section>
    </div>
  </div>
</template>
<script lang="ts">
  export default {
    data: () => ({
      items: [
        {
          title: 'Home',
          disabled: false,
          href: '/',
        },
        {
          title: 'Guide',
          disabled: true,
          href: '/guide',
        },
      ],
    }),
  }
</script>
