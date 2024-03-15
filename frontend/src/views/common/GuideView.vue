<template>
  <CommonLayout>
    <div class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg">
      <v-breadcrumbs :items="items">
        <template v-slot:title="{ item }">
          {{ item.title }}
        </template>
      </v-breadcrumbs>
      <article
        class="space-y-4 pt-4 text-lg leading-relaxed text-gray-700 letter-spacing md:letter-spacing-normal"
      >
        <h2 class="text-4xl font-ourfit text-primary-600">Guide</h2>
        <p class="lead">A step-by-step guide to signing up and setting up your account.</p>
        <h2 class="text-4xl font-ourfit text-primary-600">Features Overview</h2>
        <p class="lead">Explore the key features of our platform and how they can benefit you.</p>
        <h2 class="text-4xl font-ourfit text-primary-600">Best Practices</h2>
        <p class="lead">Tips and tricks for maximizing productivity and efficiency.</p>
      </article>
    </div>
  </CommonLayout>
</template>
<script lang="ts">
import CommonLayout from '@/views/layouts/CommonLayout.vue'
export default {
  components: {
    CommonLayout
  },
  data: () => ({
    items: [
      {
        title: 'Home',
        disabled: false,
        href: '/'
      },
      {
        title: 'Guide',
        disabled: true,
        href: '/guide'
      }
    ]
  })
}
</script>
