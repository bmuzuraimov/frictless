<template>
  <section data-aos="fade-in" data-aos-easing="ease-in-sine" data-aos-duration="1000" class="relative max-w-screen-xl mx-auto py-6 px-4 sm:px-8">
    <!-- <div class="absolute top-0 left-0 w-full h-full bg-white opacity-40"></div> -->
    <div class="relative z-10 gap-5 items-center lg:flex">
      <div class="flex-1 max-w-lg py-5 sm:mx-auto sm:text-center lg:max-w-xl lg:text-left">
        <h3 class="text-3xl sm:text-4xl font-ourfit text-secondary-800 font-semibold">Effortless Organization</h3>
        <p class="mt-2 sm:mt-3 text-lg sm:text-xl font-ourfit leading-normal text-gray-600">
          Visualize your priorities for today and tomorrow with ease. Frictless simplifies your planning, so you can spend more time achieving and less time organizing.
        </p>
        <router-link
          class="mt-4 sm:mt-5 px-4 py-2 text-ourfit hover:text-primary-400 font-medium bg-primary-50 bg-opacity-50 rounded-full inline-flex items-center"
          to="/login"
        >
          Try it out
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
      <div class="flex-1 rounded-xl sm:order-first order-last mt-4 sm:mt-5 mx-auto sm:w-9/12 lg:mt-0 lg:w-auto">
        <img src="@/assets/images/cta-left.png" alt="Frictless Interface" class="w-full rounded-xl" />
      </div>
    </div>
  </section>
</template>
