<template>
  <section class="relative py-14">
    <div
      class="hidden lg:block absolute top-0 w-full h-[521px]"
      style="
        background: linear-gradient(
          152.92deg,
          rgba(124, 114, 146, 0.3) 4.54%,
          rgba(124, 114, 146, 0.05) 34.2%,
          rgba(124, 114, 146, 0.531) 77.55%
        );
      "
    ></div>
    <div class="max-w-screen-xl mx-auto text-gray-600 sm:px-4 md:px-8">
      <div class="relative max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0">
        <h3 class="text-indigo-600 font-semibold">Pricing</h3>
        <p class="text-gray-800 text-3xl font-semibold sm:text-4xl">Start Automating Now</p>
        <div class="max-w-xl">
          <p>
            Whether you are a one student or CEO, we have a plan for everyone. Pause or cancel at anytime.
          </p>
        </div>
      </div>
      <div class="mt-16 justify-center sm:flex">
        <div
          v-for="plan in plans"
          :key="plan.name"
          class="relative flex-1 flex items-stretch flex-col mt-6 sm:mt-0 sm:rounded-xl sm:max-w-md"
          :class="{ 'bg-white shadow-lg sm:border': plan.isMostPop }"
        >
          <div class="p-4 py-8 space-y-4 border-b md:p-8">
            <span class="text-indigo-600 font-medium">
              {{ plan.name }}
            </span>
            <div class="text-gray-800 text-3xl font-semibold">
              ${{ plan.price }} <span class="text-xl text-gray-600 font-normal">/mo</span>
            </div>
            <p>
              {{ plan.desc }}
            </p>
            <button
              @click="login"
              class="px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-secondary-700 hover:bg-secondary-500 active:bg-secondary-700"
            >
              {{ plan.buttonText }}
            </button>
          </div>
          <ul class="p-4 py-8 space-y-3 md:p-8">
            <li class="pb-2 text-gray-800 font-medium">Features</li>
            <li v-for="feature in plan.features" :key="feature" class="flex items-center gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-indigo-600"
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
export default {
  data() {
    return {
      plans: [
        {
          name: 'Freemium',
          desc: 'Jumpstart your new life for free.',
          price: 0.00,
          isMostPop: false,
          features: [
            'Scheduler',
            'Voice assitant',
            'External calendar',
            'Statistics',
            'Manual schedule',
            'Standard support',
          ],
          buttonText: 'Start for Free'
        },
        {
          name: 'Premium',
          desc: '0 Strees + Strategic Mindset',
          price: 49.99,
          isMostPop: true,
          features: [
            'Scheduler',
            'Voice assitant',
            'External calendar',
            'Statistics',
            'Daily auto schedule',
            'Ad free',
            '24/7 priority support'
          ],
          buttonText: 'Join Now'
        }
      ]
    }
  },
  methods: {
    login() {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
</style>