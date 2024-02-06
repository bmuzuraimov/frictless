<template>
    <section class="py-14">
    <div class="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      <div class="relative max-w-2xl mx-auto sm:text-center">
        <div class="relative z-10">
          <h3 class="text-4xl font-ourfit text-secondary-800 font-semibold">
            Features
          </h3>
          <p class="mt-3 text-xl font-ourfit leading-normal text-gray-600">
            Advantages Over Other Task Management Tools
          </p>
        </div>
        <div
          class="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]"
          style="
            background: linear-gradient(
              152.92deg,
              rgba(192, 132, 252, 0.2) 4.54%,
              rgba(232, 121, 249, 0.26) 34.2%,
              rgba(192, 132, 252, 0.1) 77.55%
            );
          "
        ></div>
      </div>
      <div class="relative mt-12">
        <ul class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="feature in features"
            :key="feature.title"
            class="bg-white space-y-3 p-4 font-ourfit leading-normal border rounded-lg shadow-md hover:shadow-lg transition duration-150"
          >
            <div class="flex items-center mb-4 text-purple-600" v-html="feature.icon"></div>
            <h5 class="text-lg font-semibold text-gray-800">{{ feature.title }}</h5>
            <p class="mt-2 text-base">{{ feature.desc }}</p>
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
      features: [
        {
          icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' class='w-6 h-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z' />
              </svg>`,
          title: 'One-Click Planning',
          desc: 'Simplify your task management with a single click. Acuella turns overwhelming lists into a structured plan for today and tomorrow.'
        },
        {
          icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' class='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z' />
          </svg>`,
          title: 'Dynamic Adaptability',
          desc: 'As your day changes, Acuella changes with you. Adjust your tasks and priorities on-the-go, ensuring that you\'re always focused on what matters most, no matter what the day throws at you.'
        },
        {
          icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' class='w-6 h-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' />
              </svg>`,
          title: 'Analytics',
          desc: 'Dive into your monthly performance with insightful analytics. Track your progress, identify trends, and uncover areas for improvement to continuously optimize your productivity.'
        },
        {
          icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' class='w-6 h-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z' />
              </svg>`,
          title: 'Seamless Integrations',
          desc: 'Keep everything in sync with effortless integration into Notion and Apple Calendar, ensuring a unified view of your tasks and schedule.'
        },
        {
          icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' class='w-6 h-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3' />
              </svg>`,
          title: 'Intuitive Prioritization',
          desc: 'Easily decide what needs your attention first. With Acuella, you can highlight immediate tasks and plan ahead for what\'s coming, making sure you\'re always a step ahead.'
        },
        {
          icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' class='w-6 h-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h

0a11.959 11.959 0 00-8.402-3.714V2.714z' />
              </svg>`,
          title: 'Customizable Schedules',
          desc: 'Tailor your day to fit your unique rhythm. Acuella adapts to your life, helping you slot tasks into the best times, so you\'re working efficiently and effectively.'
        },
      ],
    }
  },
}
</script>
