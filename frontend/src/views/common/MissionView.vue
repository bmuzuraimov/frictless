<template>
  <CommonLayout>
    <div class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg">
      <v-breadcrumbs :items="items">
        <template v-slot:title="{ item }">
          {{ item.title }}
        </template>
      </v-breadcrumbs>
      <article
        class="space-y-4 mb-12 pt-4 text-lg leading-relaxed text-gray-700 letter-spacing md:letter-spacing-normal"
      >
        <h2 class="text-4xl font-ourfit text-primary-600">Mission</h2>
        <p class="lead">
          To empower individuals to thrive in the age of AI by maximizing their productivity and
          fostering a strategic mindset.
        </p>
        <h3 class="text-2xl font-ourfit text-primary-500">Values</h3>
        <ol>
          <li>
            <strong>Meritocracy:</strong> We believe hard work and dedication should be rewarded.
          </li>
          <li>
            <strong>Time:</strong> Time is your most valuable resource. Frictionless helps you use
            it wisely.
          </li>
          <li>
            <strong>Strategic Mindset:</strong> We go beyond to-do lists, fostering strategic
            prioritization for long-term success.
          </li>
          <li>
            <strong>Management Mindset:</strong> We understand life is unpredictable. Frictionless
            adapts with you.
          </li>
          <li>
            <strong>Winners' Mentality:</strong> Frictionless is for those who actively seek to be
            the best version of themselves.
          </li>
        </ol>
        <h3 class="text-2xl font-ourfit text-primary-500">Purpose</h3>
        <p class="lead">
          We believe the rise of AI isn't a threat, but an opportunity. Frictionless equips
          individuals to navigate this changing landscape by prioritizing strategic tasks and
          optimizing their daily schedules.
        </p>
        <h3 class="text-2xl font-ourfit text-primary-500">Goals</h3>
        <ol>
          <li>
            <strong>Elevate your productivity:</strong> Frictionless streamlines your workflow,
            minimizing manual intervention.
          </li>
          <li>
            <strong>Build strategic habits:</strong> Focus on high-impact tasks that propel you
            towards your goals.
          </li>
          <li>
            <strong>Embrace adaptability:</strong> Frictionless adjusts to unforeseen circumstances,
            ensuring you stay on track.
          </li>
          <li>
            <strong>Sleep soundly:</strong> Develop a sense of accomplishment with clear priorities
            for tomorrow.
          </li>
        </ol>
        <h3 class="text-2xl font-ourfit text-primary-500">Join the Movement:</h3>
        <p>
          We are a team of passionate individuals building a community of empowered go-getters. Even
          as a bootstrapped project, we are committed to helping you become "superhuman" in the face
          of AI advancement.
        </p>
        <p>This is your chance to redefine productivity. <strong>Are you ready to thrive?</strong></p>
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
