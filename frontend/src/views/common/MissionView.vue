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
        <h2 class="text-4xl font-ourfit text-primary-600">Mission</h2>
        <h3 class="text-2xl font-ourfit text-primary-500">Values</h3>
        <p class="lead">Our Values</p>
        <h3 class="text-2xl font-ourfit text-primary-500">Purpose</h3>
        <p class="lead">Our Purpose</p>
        <h3 class="text-2xl font-ourfit text-primary-500">Goals</h3>
        <p class="lead">
          Our first goal is simple: We want to help you tackle the real cause of stress.
        </p>
        <figure>
          <img
            src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"
            alt=""
          />
          <figcaption>Digital art by Anonymous</figcaption>
        </figure>
        <p>
          Stress doesn't just come from hard work; it often comes from not dealing with things we
          should be handling.
        </p>
        <p>When we ignore tasks or decisions we have control over, that's when stress builds up.</p>
        <p>
          Our app is here to change that. We'll help you focus on what's important, making sure
          you're taking action on the things you shouldn't ignore.
        </p>
        <p>
          This way, you can spend less time feeling stressed and more time working towards your big
          goals.
        </p>
        <p>
          Our second vision is to enhance your ability to think quickly and make smart decisions.
        </p>
        <p>
          In today's fast-paced world, moving towards an era of rapid technological advancements,
          it's crucial to learn how to prioritize and think on your feet.
        </p>
        <p>
          Our app helps you by setting specific time limits for each task. This encourages your
          brain to focus on the essential aspects, following the 80/20 rule—focusing on the 20% of
          efforts that yield 80% of results.
        </p>
        <p>
          If tasks aren't finished within the allotted time, they're moved to the next day. This
          approach not only helps in prioritizing but also trains you to identify what truly
          matters.
        </p>
        <p>
          For instance, it's about concentrating on the key points in your university lecture notes
          instead of trying to cover everything. By practicing this daily, you'll improve at
          choosing what's significant, streamlining your work and learning process.
        </p>
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
        title: 'Mission',
        disabled: true,
        href: '/mission'
      }
    ]
  })
}
</script>
