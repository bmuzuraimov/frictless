<template>
  <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <v-breadcrumbs :items="items">
      <template v-slot:title="{ item }">
        {{ item.title }}
      </template>
    </v-breadcrumbs>
    <div class="space-y-8">
      <section class="pt-4">
        <h2 class="text-4xl font-ourfit text-primary-600">Mission</h2>
        <div class="max-w-2xl my-8">
          <div class="text-lg leading-relaxed text-gray-700">
            <p class="mb-4">
              Our first goal is simple: We want to help you tackle the real cause of stress.
            </p>
            <p class="mb-4">
              Stress doesn't just come from hard work; it often comes from not dealing with things
              we should be handling.
            </p>
            <p class="mb-4">
              When we ignore tasks or decisions we have control over, that's when stress builds up.
            </p>
            <p class="mb-4">
              Our app is here to change that. We'll help you focus on what's important, making sure
              you're taking action on the things you shouldn't ignore.
            </p>
            <p class="mb-8">
              This way, you can spend less time feeling stressed and more time working towards your
              big goals.
            </p>
            <!-- Second mission -->
            <p class="mb-4">
              Our second vision is to enhance your ability to think quickly and make smart
              decisions. In today's fast-paced world, moving towards an era of rapid technological
              advancements, it's crucial to learn how to prioritize and think on your feet.
            </p>
            <p class="mb-4">
              Our app helps you by setting specific time limits for each task. This encourages your
              brain to focus on the essential aspects, following the 80/20 rule—focusing on the 20%
              of efforts that yield 80% of results.
            </p>
            <p class="mb-4">
              If tasks aren't finished within the allotted time, they're moved to the next day. This
              approach not only helps in prioritizing but also trains you to identify what truly
              matters.
            </p>
            <p>
              For instance, it's about concentrating on the key points in your university lecture
              notes instead of trying to cover everything. By practicing this daily, you'll improve
              at choosing what's significant, streamlining your work and learning process.
            </p>
          </div>
        </div>
      </section>
      <!-- Eliminate and automated all redundancies associated with scheduling. Plug and play template -->
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
        href: '/'
      },
      {
        title: 'Mission',
        disabled: true,
        href: '/mission'
      }
    ]
  })
}
</script>
