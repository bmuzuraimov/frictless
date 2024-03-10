<template>
  <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <v-breadcrumbs :items="items">
      <template v-slot:title="{ item }">
        {{ item.title }}
      </template>
    </v-breadcrumbs>
    <div class="space-y-8">
      <!-- Our Story -->
      <section id="our-story" class="pt-4">
        <h2 class="text-4xl font-ourfit text-primary-600">Hi, I am Baiel Muzuraimov</h2>
        <div class="flex flex-col md:flex-row gap-x-16">
          <div class="text-lg text-gray-600">
            <p class="my-4">
              I've always been driven, aiming for success in every aspect of my life.
            </p>
            <p class="my-4">
              But it wasn't until I faced a significant setback that I truly understood the
              importance of precise planning and prioritization.
            </p>
            <p class="my-4">
              After years of hard work and dedication, my dream was to earn a scholarship at one of
              the top universities.
            </p>

            <p class="my-4">
              Despite my achievements, including winning national olympiads and representing my
              country in global events, I faced disappointment.
            </p>
            <p class="my-4">
              I didn't get the full-admission scholarship I aimed for, and among all the international students in
              Hong Kong, I was the only one self-funded.
            </p>
            <p class="my-4">This experience was a turning point for me.</p>

            <p class="my-4">
              My sister's disappointment echoed my own feelings of not meeting the expectations set
              for me.
            </p>

            <p class="my-4">It was a harsh reality check, but it also ignited a fire within me. It was a catalyst for transformation.</p>
          </div>
          <img class="w-[500px] object-cover" src="@/assets/images/common/story-main.png" alt="" />
        </div>
        <div class="text-lg text-gray-600">
          <p class="my-4">
            I started asking myself, "HOW DO I SURPASS MY PEERS?" Not out of envy, but from a desire
            to excel and make the most of my capabilities.
          </p>

          <p class="my-4">
            In our education system, we were all expected to acquire the same knowledge and obtain identical bachelor's degrees. 
            However, in 2022, the introduction of generative AI through its first public release fundamentally changed our perspective on the education system.
          </p>

          <p class="my-4">
            It made me realize that while we all have the same 24 hours in a day, it's how we use those
            hours that sets us apart.
          </p>

          <p class="my-4">
            Conventional wisdom suggests that time, unlike currency, cannot be stored or saved; it is either used or lost forever. However, my intention was to challenge this notion and demonstrate that the value derived from time can indeed be stored and optimized. The traditional approach to time management revolves around maximizing productivity within the limited 24 hours we have each day. However, this perspective often overlooks the crucial aspect of storing value over time, extending beyond immediate tasks. I strongly belive value can be stored in the actions and choices we make throughout the day.
          </p>

          <p class="my-4">
            My journey into productivity began modestly with paper planning, gradually evolving into digital scheduling, culminating in the creation of Frictless.
          </p>

          <p class="my-4">
            This sophisticated auto-scheduler, integrated into the fabric of Notion and synced with my iPhone calendar and smart watch, was my answer to transcending the limitations imposed by time. It wasn’t merely about adhering to a schedule; it was about crafting a lifestyle where each moment is intentionally aligned with what truly matters, thereby storing the value of time effectively.
          </p>

          <p class="my-4">
            Critics might view my life as robotic, yet this structured approach has been my holy grail for achieving and surpassing my goals.
          </p>

          <p class="my-4">
            It’s a testament to the principle that the value we create today can be preserved, allowing us to build upon it tomorrow. This philosophy underpins Frictless: it's a new way in how we perceive and interact with time in the fast paced world of AI.
          </p>

          <p class="my-4">
            As Baiel, the founder of Frictless, my narrative is not solely about overcoming a setback. 
          </p>

          <p class="my-4">
            It embodies the relentless pursuit of excellence through strategic planning and prioritization, based on the innovative premise that time's value can be stored and maximized. Frictless is the embodiment of this vision—a tool, a philosophy, a new way of living each day to its fullest potential, ensuring our tasks and priorities resonate with our ultimate aspirations.
          </p>

          <p class="my-4">
            It's a testament to the fact that with the right tools and mindset, we can achieve our
            goals and surpass even our own expectations.
          </p>

          <p class="my-4">
            As Baiel, founder of this productivity app, I'm here to share the system that
            transformed my life.
          </p>

          <p class="my-4">
            This is the essence of true productivity. It's about transcending the traditional confines of time management to embrace a methodology where time becomes a currency of stored value.
          </p>

          <p class="my-4">
            With Frictless, I invite you to experience this paradigm shift, to live a life where every second counts, not just in the present, but as a building block for the future.
          </p>
        </div>
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
