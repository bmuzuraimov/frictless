<template>
  <section class="flex item-center max-w-screen-xl md:h-screen mx-auto py-6 px-4 sm:px-8">
    <div class="z-10 gap-5 flex flex-col md:flex-row items-center">
      <div class="flex-1 rounded-xl mt-4 sm:mt-5 mx-auto sm:w-9/12 lg:mt-0 lg:w-auto">
        <img src="@/assets/images/cta-right.png" class="w-full rounded-xl" alt="" />
      </div>
      <div class="flex-1 max-w-lg py-5 sm:mx-auto sm:text-center lg:max-w-xl lg:text-left">
        <h3 class="text-3xl sm:text-4xl font-ourfit text-secondary-800 font-semibold">
          How It Works
        </h3>
        <p class="mt-2 sm:mt-3 text-lg sm:text-xl font-ourfit leading-normal text-gray-600">
          Discover Frictless's one-click planning solution. Visualize and adjust your priorities for
          today and tomorrow effortlessly. Reduce planning time by 50% and reclaim hours for what
          matters.
        </p>
        <v-expansion-panels variant="accordion" class="my-4">
          <v-expansion-panel
            v-for="i in 3"
            :key="i"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            title="Item"
          ></v-expansion-panel>
        </v-expansion-panels>
        <router-link
          to="/guide"
          class="inline-flex gap-x-1 items-center text-primary-600 text-ourfit hover:text-primary-400 duration-150 font-medium"
        >
          Learn more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>
