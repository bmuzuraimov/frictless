<template>
  <section
    class="flex items-center py-8 h-screen sm:py-14"
    data-aos="fade-in"
    data-aos-easing="ease-in-sine"
    data-aos-duration="1000"
  >
    <div class="max-w-screen-xl mx-auto text-gray-600">
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
        <ul class="flex flex-nowrap flex-row overflow-x-auto gap-6">
          <li
            v-for="feature in features"
            :key="feature.title"
            class="shrink-0 p-8 rounded-[40px] bg-white/40 border-grey/60 border-[1px] w-[340px] h-[540px] relative flex flex-col gap-4"
          >
            <div class="flex flex-row gap-x-2 justify-center">
              <span class="flex items-center mb-4 text-purple-600" v-html="feature.icon"></span>
              <h5 class="text-md sm:text-lg font-semibold text-gray-800">{{ feature.title }}</h5>
            </div>
            <p class="text-sm sm:text-base">{{ feature.desc }}</p>
            <img
              src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicryl.com%2Fmedia%2Fcoming-soon-soon-coming-bff331&psig=AOvVaw1fTSXuyBSZkG2A6_sBBxNv&ust=1715685640068000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCODTk5vBioYDFQAAAAAdAAAAABAE"
              alt=""
              class=""
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
            <path d="M18 10H6M21 6H3M21 14H3M18 18H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
        title: 'Prioritized Task Management',
        desc: 'Frictless analyzes your tasks and intelligently schedules your day, focusing on immediate priorities while considering future commitments.'
      },
      {
        icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' class='w-6 h-6'>
            <path d="M21 8H3M16 2V5M8 2V5M12 18V12M9 15H15M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
        title: 'One-Click Calendar Integration',
        desc: 'Automatically syncs with your native calendar, ensuring your schedule is always up-to-date with zero manual entry.'
      },
      {
        icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' class='w-6 h-6'>
            <path d="M8.46445 8.46448L4.92893 4.92896M4.92893 19.0711L8.46448 15.5355M15.5355 15.5355L19.0711 19.071M19.0711 4.92891L15.5355 8.46445M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
        title: 'Revive Feature',
        desc: 'Unexpected changes? Hit "Revive" to reorganize your day instantly, ensuring productivity remains uninterrupted.'
      },
      {
        icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' class='w-6 h-6'>
            <path d="M15.0002 19C15.0002 20.6569 13.6571 22 12.0002 22C10.3434 22 9.00025 20.6569 9.00025 19M13.7968 6.23856C14.2322 5.78864 14.5002 5.17562 14.5002 4.5C14.5002 3.11929 13.381 2 12.0002 2C10.6195 2 9.50025 3.11929 9.50025 4.5C9.50025 5.17562 9.76825 5.78864 10.2037 6.23856M2.54707 8.32296C2.53272 6.87161 3.3152 5.51631 4.57928 4.80306M21.4534 8.32296C21.4678 6.87161 20.6853 5.51631 19.4212 4.80306M18.0002 11.2C18.0002 9.82087 17.3681 8.49823 16.2429 7.52304C15.1177 6.54786 13.5915 6 12.0002 6C10.4089 6 8.88283 6.54786 7.75761 7.52304C6.63239 8.49823 6.00025 9.82087 6.00025 11.2C6.00025 13.4818 5.43438 15.1506 4.72831 16.3447C3.92359 17.7056 3.52122 18.3861 3.53711 18.5486C3.55529 18.7346 3.58876 18.7933 3.73959 18.9036C3.87142 19 4.53376 19 5.85844 19H18.1421C19.4667 19 20.1291 19 20.2609 18.9036C20.4117 18.7933 20.4452 18.7346 20.4634 18.5486C20.4793 18.3861 20.0769 17.7056 19.2722 16.3447C18.5661 15.1506 18.0002 13.4818 18.0002 11.2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
        title: 'Direct Reminders',
        desc: 'Integrates reminders directly into your phone’s calendar for non-intrusive, timely prompts.'
      },
      {
        icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' class='w-6 h-6'>
            <path d="M18 10V3.6C18 3.03995 18 2.75992 17.891 2.54601C17.7951 2.35785 17.6422 2.20487 17.454 2.10899C17.2401 2 16.9601 2 16.4 2H7.6C7.03995 2 6.75992 2 6.54601 2.10899C6.35785 2.20487 6.20487 2.35785 6.10899 2.54601C6 2.75992 6 3.03995 6 3.6V10M18 10H6M18 10V10.2C18 11.8802 18 12.7202 17.673 13.362C17.3854 13.9265 16.9265 14.3854 16.362 14.673C15.7202 15 14.8802 15 13.2 15H10.8C9.11984 15 8.27976 15 7.63803 14.673C7.07354 14.3854 6.6146 13.9265 6.32698 13.362C6 12.7202 6 11.8802 6 10.2V10M14.5 15V19.5C14.5 20.8807 13.3807 22 12 22C10.6193 22 9.5 20.8807 9.5 19.5V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
        title: 'Customizable for Individual Use',
        desc: 'Tailors your daily planning with high customization options, adapting to your unique productivity style.'
      },
      {
        icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' class='w-6 h-6'>
            <path d="M12 19.5H12.01M22.8064 8.70076C19.9595 6.09199 16.1656 4.5 11.9999 4.5C7.83414 4.5 4.04023 6.09199 1.19336 8.70076M4.73193 12.243C6.67006 10.5357 9.21407 9.5 12 9.5C14.7859 9.5 17.3299 10.5357 19.268 12.243M15.6983 15.7751C14.6792 14.9763 13.3952 14.5 11.9999 14.5C10.5835 14.5 9.28172 14.9908 8.25537 15.8116" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
        title: 'Universal Access',
        desc: 'Available across iOS, Mac, Android, and Web through Notion, requiring only a one-time setup on the Frictless website.'
      }
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
