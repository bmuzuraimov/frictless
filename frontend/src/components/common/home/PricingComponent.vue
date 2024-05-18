<template>
  <section class="relative py-10 sm:py-14">
    <div
      class="hidden lg:block absolute top-0 w-full h-[420px] sm:h-[521px]"
      style="
        background: linear-gradient(
          180deg,
          rgba(187, 177, 208, 0) 0%,
          rgba(124, 114, 146, 0.1) 15%,
          rgba(173, 164, 193, 0.2) 50%,
          rgba(124, 114, 146, 0.1) 85%,
          rgba(187, 177, 208, 0) 100%
        );
      "
    ></div>
    <div class="max-w-screen-xl mx-auto text-gray-600 px-4 sm:px-6 lg:px-8">
      <div class="relative max-w-xl mx-auto space-y-3 px-4 sm:text-center">
        <h3 class="text-indigo-600 font-semibold text-lg sm:text-xl">Pricing</h3>
        <h2 class="text-center text-3xl sm:text-4xl font-ourfit text-secondary-800 font-semibold">
          Start Automating Now
        </h2>
        <div class="max-w-md sm:max-w-xl mx-auto">
          <p class="text-lg sm:text-xl font-ourfit leading-normal text-gray-600">
            Start for free. No credit cards required.
          </p>
        </div>
      </div>
      <div class="mt-12 sm:mt-16 justify-center sm:flex sm:flex-wrap gap-4">
        <div
          v-for="plan in plans"
          :key="plan.name"
          class="relative flex-1 flex items-stretch flex-col mt-6 sm:mt-0 sm:rounded-xl sm:max-w-md mx-2"
          :class="
            plan.isMostPop
              ? 'bg-white shadow-lg sm:border'
              : 'backdrop-blur-sm bg-white/10 shadow-lg sm:border border-gray-100/40'
          "
        >
          <div class="p-4 py-6 space-y-3 border-b md:p-6">
            <span class="text-indigo-600 font-medium text-base sm:text-lg">
              {{ plan.name }}
            </span>
            <div class="text-gray-800 text-2xl font-semibold">
              ${{ plan.price }} <span class="text-lg text-gray-600 font-normal">/mo</span>
            </div>
            <p class="text-sm sm:text-base">
              {{ plan.desc }}
            </p>
            <button
              @click="$router.push('/login')"
              class="px-4 py-2 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-secondary-700 hover:bg-secondary-500 active:bg-secondary-700 hover:pl-2"
            >
              {{ plan.buttonText }}
          </button>
          </div>
          <ul class="p-4 py-6 space-y-2 md:p-6">
            <li class="pb-1 text-gray-800 font-medium text-base">Features</li>
            <li v-for="feature in plan.features" :key="feature" class="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-indigo-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="text-lg font-ourfit leading-normal text-gray-600">{{ feature }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { ref } from 'vue'

export default {
  setup(){
    const plans = ref([
        {
          name: 'Freemium',
          desc: 'Jumpstart your new life for free.',
          price: 0.0,
          isMostPop: false,
          features: [
            'Scheduler',
            'Voice assitant',
            'External calendar',
            'Statistics',
            'Manual schedule',
            'Standard support'
          ],
          buttonText: 'Start for Free'
        },
        {
          name: 'Premium',
          desc: '0 Strees + Strategic Mindset',
          price: 8.99,
          isMostPop: true,
          features: [
            'Scheduler',
            'Voice assitant',
            'External calendar',
            'Statistics',
            'Daily auto schedule',
            'Ad free',
            'Extra revive points',
            '24/7 priority support'
          ],
          buttonText: 'Join Now'
        }
      ])
    return { plans }
  }
}
</script>
