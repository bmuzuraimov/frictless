<template>
  <section
    class="flex items-center py-8 md:h-screen sm:py-14"

  >
    <div class="w-screen mx-auto text-gray-600">
      <div class="relative max-w-xl mx-auto text-center">
        <div class="relative z-10">
          <h3 class="text-3xl sm:text-4xl font-ourfit text-secondary-800 font-semibold">
            Features
          </h3>
          <p class="mt-3 text-lg sm:text-xl font-ourfit leading-normal text-gray-600">
            Benefits Over Other Task Management Tools
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
      <div class="relative mt-8 sm:mt-12">
        <ul class="flex flex-nowrap flex-row overflow-x-auto gap-6 px-2">
          <li class="shrink-0 w-1/8 md:w-1/3"></li>
          <li
            v-for="feature in features"
            :key="feature.title"
            class="shrink-0 p-8 rounded-[40px] bg-white/75 border-grey/60 border-[1px] w-[340px] h-[540px] relative flex flex-col gap-4"
          >
            <div class="flex flex-row gap-x-2 justify-center">
              <span class="flex items-center mb-4 text-purple-600" v-html="feature.icon"></span>
              <h5 class="text-md sm:text-lg font-semibold text-gray-800" v-html="feature.title"></h5>
            </div>
            <p class="text-lg sm:text-md" v-html="feature.desc"></p>
            <img
              :src="feature.image"
              alt=""
              class="w-full drop-shadow-lg max-h-full object-cover object-center"
            />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const features = ref([
    {
        icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' class='w-6 h-6'>
          <rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="12" r="1"/>
              </svg>`,
        title: 'Laser Focus',
        desc: 'Focus on <span class="font-bold text-red-600">one day at a time</span>, while considering future activities to prevent overloading your schedule.',
        image: './src/assets/images/feature_01.png'
      },
      {
        icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' class='w-6 h-6'>
          <path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M11 4h4"/><path d="M11 8h7"/><path d="M11 12h10"/>
              </svg>`,
        title: 'Need <span class="line-through">Want</span>',
        desc: 'Frictless prioritizes your needs over wants, ensuring you complete essential tasks before moving on to secondary activities.',
        image: './src/assets/images/feature_02.png'
      },
      {
        icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' class='w-6 h-6'>
          <path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/>
              </svg>`,
        title: 'NLP Assistant',
        desc: 'Interact through natural language processing, allowing for task management through voice commands.',
        image: './src/assets/images/feature_03.png'
      },
      {
        icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' class='w-6 h-6'>
          <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 15 6 6"/><path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z"/>
              </svg>`,
        title: '<span class="">Revive Feature</span>',
        desc: 'Unexpected changes? Hit "Revive" to reorganize your day instantly, ensuring productivity remains uninterrupted.',
        image: './src/assets/images/feature_04.png'
      },
      {
        icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' class='w-6 h-6'>
          <path d="M19.4 14.9C20.2 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 .7 0 1.3.1 1.9.3"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><circle cx="18" cy="8" r="3"/>
              </svg>`,
        title: 'Direct Reminders',
        desc: 'Integrates seamlessly with your existing calendar and syncs with your wearables. Receive discreet notifications directly on wearable.',
        image: './src/assets/images/feature_05.png'
      },
      {
        icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' class='w-6 h-6'>
          <path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"/><path d="m16 19 2 2 4-4"/>
          </svg>`,
        title: 'Minimal Interactions',
        desc: 'Minimized interactions, so you can spend less time managing tasks and more time completing them. Notion template is provided.',
        image: './src/assets/images/feature_06.png'
      },
    ])

    return {
      features
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
