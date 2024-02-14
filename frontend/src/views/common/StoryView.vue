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

            <p class="my-4">It was a harsh reality check, but it also ignited a fire within me.</p>
          </div>
          <img class="w-[500px] object-cover" src="@/assets/images/common/story-main.png" alt="" />
        </div>
        <div class="text-lg text-gray-600">
          <p class="my-4">
            I started asking myself, "HOW DO I SURPASS MY PEERS?" Not out of envy, but from a desire
            to excel and make the most of my capabilities.
          </p>

          <p class="my-4">
            I realized that while we all have the same 24 hours in a day, it's how we use those
            hours that sets us apart.
          </p>

          <p class="my-4">
            My life into productivity began with simple paper planning, evolved through digital
            scheduling, and finally, led to the development of a sophisticated auto-scheduler that
            prioritizes tasks based on their importance.
          </p>

          <p class="my-4">
            This system, which I've integrated into Notion and my iPhone calendar, syncs with my
            Xiaomi smart band to keep me on track throughout the day.
          </p>

          <p class="my-4">
            It might seem like I'm leading a robotic life(I got used to hearing it from people), but
            this level of organization has been invaluable.
          </p>

          <p class="my-4">
            It's not just about getting through my to-do list; it's about ensuring every moment is
            spent on what truly matters.
          </p>

          <p class="my-4">My story is not just about overcoming a setback.</p>

          <p class="my-4">
            It's about the relentless pursuit of excellence through strategic planning and
            prioritization.
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
            It's an app; it's a philosophy. A way to live each day to its fullest potential,
            ensuring that every task, every priority, is aligned with our ultimate goals.
          </p>

          <p class="my-4">
            This is the essence of true productivity, and it's what I'm passionate about bringing to
            the world.
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
