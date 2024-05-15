<template>
  <section
    data-aos="fade-in"
    data-aos-easing="ease-in-sine"
    data-aos-duration="1000"
    class="flex item-center max-w-screen-xl h-screen mx-auto py-6 px-4 sm:px-8"
  >
    <div class="z-10 gap-5 flex items-center">
      <div class="flex-1 max-w-lg py-5 sm:mx-auto sm:text-center lg:max-w-xl lg:text-left">
        <h3 class="text-3xl sm:text-4xl font-ourfit text-secondary-800 font-semibold">
          Integrate & Prioritize with Ease
        </h3>
        <p class="mt-2 sm:mt-3 text-lg sm:text-xl font-ourfit leading-normal text-gray-600">
          Integrate your tasks and calendar in one click with Frictless. Gain instant clarity on
          today's top priorities and allocate your time where it impacts most. Start seeing results
          as early as today.
        </p>
        <v-expansion-panels class="my-4">
          <v-expansion-panel
            v-for="i in 3"
            :key="i"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            title="Item"
          ></v-expansion-panel>
        </v-expansion-panels>
        <router-link
          class="mt-4 sm:mt-5 px-4 py-2 text-ourfit hover:text-primary-400 font-medium bg-primary-50 bg-opacity-50 rounded-full inline-flex items-center"
          to="/login"
        >
          See How
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 ml-2 duration-150"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </router-link>
      </div>
      <div
        class="flex-1 rounded-xl sm:order-first order-last mt-4 sm:mt-5 mx-auto sm:w-9/12 lg:mt-0 lg:w-auto"
      >
        <img
          src="@/assets/images/cta-left.png"
          alt="Frictless Interface"
          class="w-full rounded-xl"
        />
      </div>
    </div>
  </section>
</template>
