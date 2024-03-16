<template>
  <CommonLayout>
    <div
      class="max-w-screen-xl mx-auto px-4 py-12 format format-sm sm:format-base sm:px-6 lg:px-8 lg:format-lg"
    >
      <v-breadcrumbs :items="items">
        <template v-slot:title="{ item }">
          {{ item.title }}
        </template>
      </v-breadcrumbs>
      <article
        class="space-y-4 pt-4 text-lg leading-relaxed text-gray-700 letter-spacing md:letter-spacing-normal"
      >
        <h2 class="text-4xl font-ourfit text-primary-600">Hi, I am Baiel Muzuraimov</h2>
        <div class="flex flex-col md:flex-row gap-x-16">
          <div class="text-lg text-gray-600">
            <p>Like most students, I craved success.</p>
            <p>
              Scholarships, awards, the whole package. But somewhere along the way, I started losing
              ground.
            </p>
            <p>
              Despite national olympiad wins and international representation, securing a full
              scholarship felt like a distant dream.
            </p>

            <p>The disappointment wasn't just mine – it echoed in my sister's eyes too.</p>
            <p>This wasn't failure, it was a turning point.</p>
            <p>Frustration ignited a fire within me.</p>

            <p>
              "How can I excel?" I asked, not out of envy, but a deep desire to reach my full
              potential.
            </p>

            <p>
              Next, I decided to come to Hong Kong during Covid-19 pandemic to pursue computer
              science degree.
            </p>
          </div>
          <img class="w-[500px] object-cover" src="@/assets/images/common/story-main.png" alt="" />
        </div>
        <div class="text-lg text-gray-600">
          <p>The education system felt like a one-size-fits-all mold.</p>

          <p>Everyone learned the same things, aimed for the same generic degree.</p>

          <p>Then, in 2022, generative AI hit the scene.</p>

          <p>It was a wake-up call.</p>

          <p>I realized that the future of work was changing, and I needed to adapt.</p>

          <p>We all get 24 hours, that's a fact.</p>

          <p>
            But conventional wisdom said it was fleeting - used or lost forever.
            <strong>I disagreed.</strong>
          </p>

          <p>Time's value, I believed, could be captured and maximized.</p>

          <p>Reliance of squeezing all tasks into a day worked no more.</p>

          <p>It was time to priorotize, to create lasting value from every choice.</p>

          <p>
            My journey began with paper planners, evolved into digital calendars, and ultimately
            culminated in Frictionless.
          </p>

          <p>
            Imagine an auto-scheduler seamlessly integrated with your Notion, iPhone, and
            smartwatch.
          </p>

          <p>
            It wasn't about rigid schedules; it was about crafting a life where each moment aligns
            with what truly matters.
          </p>

          <p>
            From that moment on the phrase: "Success is not attached to time but to the value we
            create within it" became a mantra.
          </p>

          <p>Some might call it structured, but this approach was my key to accumulating value.</p>

          <p>It's about what we create today adding to what we build tomorrow.</p>

          <p>
            This is the heart of Frictionless - a new way to interact with time in a fast-paced
            world.
          </p>

          <p>
            It's a tool, a philosophy, a way to live each day to its fullest, ensuring our actions
            align with our aspirations.
          </p>

          <p>With the right tools and mindset, we can achieve amazing things.</p>

          <p>
            As the founder of Frictionless, I'm here to share the system that transformed my life.
          </p>

          <p>
            This is true productivity; transcending traditional time management to view time as a
            currency with stored value.
          </p>
          <p>Frictionless invites you to experience this shift.</p>
          <p>
            Live a life where every second counts, not just now, but as a building block for your
            future.
          </p>
          <p>Remember looking back from five years in the future, that our current actions will have explained who we have become.</p>
          <p>At least, it’s mine.</p>
          <p>Much love ♥️</p>
          <p>Baiel MUZURAIMOV</p>
        </div>
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
        title: 'Story',
        disabled: true,
        href: '/story'
      }
    ]
  })
}
</script>

<style scoped>
article p {
  margin: 1rem 0;
}
</style>
