<template>
  <section
    class="max-w-screen-xl mx-auto px-2 md:px-4 py-12 sm:py-28 gap-8 sm:gap-12 text-gray-600 md:px-8"
  >
    <div class="space-y-4 sm:space-y-5 max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto text-center">
      <h2 class="text-3xl sm:text-4xl md:text-6xl font-ourfit text-gray-800 font-semibold mx-auto">
        A Day Now
        <span
          class="text-transparent bg-clip-text bg-gradient-to-b from-primary-700 to-primary-300"
        >
          Has 36 Hours
        </span>
      </h2>
      <p class="text-md sm:text-lg font-ourfit leading-normal text-gray-600 mx-auto">
        Frictless transforms your Notion workspace into an intelligent daily planner, prioritizing
        your tasks and optimizing your schedule with just a whisper to Siri or a click.
      </p>
      <p class="text-xs sm:text-sm text-indigo-600 font-medium">
        No credit card required - experience the ease today!
      </p>
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-3 sm:space-y-0"
      >
        <router-link
          to="/login"
          class="rounded-full border border-black bg-black px-4 py-1.5 text-xs sm:text-sm text-outfit text-white hover:bg-white hover:text-black"
        >
          Start Simplifying My Day
        </router-link>
        <router-link
          to="/guide"
          class="animate-fade-in rounded-full border border-black px-4 py-1.5 text-xs sm:text-sm text-ourfit transition-all hover:bg-white hover:text-black"
        >
          Learn More
        </router-link>
      </div>
    </div>
    <div class="shadow-xl border border-grey-100 rounded-lg mt-12 overflow-hidden">
      <div class="relative border-b border-red-100 h-[30px]">
        <div class="absolute flex flex-row gap-x-2 top-3 left-4">
          <svg
            class="w-2 h-2 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <circle cx="10" cy="10" r="10" />
          </svg>
          <svg
            class="w-2 h-2 text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <circle cx="10" cy="10" r="10" />
          </svg>
          <svg
            class="w-2 h-2 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <circle cx="10" cy="10" r="10" />
          </svg>
        </div>
      </div>
      <div class="relative w-full aspect-w-16 aspect-h-9">
        <!-- Phone mockup section -->
        <div class="absolute bottom-0 right-4 md:right-12 z-50 w-[100px] sm:w-[150px] md:w-[200px] lg:w-[250px] aspect-w-1 aspect-h-2">
            <img
              id="hero-phone"
              src="@/assets/images/hero-demo_iphone.gif"
              class="w-full object-cover object-center"
              alt="A demo showing Frictless app interface"
            />
        </div>
        <!-- End of phone mocup section -->
        <!-- Siri section -->
        <div class="absolute bottom-0 right-0 left-0 z-50">
          <img
              src="@/assets/images/hero_siri.gif"
              class="w-[200px] mx-auto"
              alt="A demo showing Frictless app interface"
            />
        </div>
        <!-- End of Siri section -->
        <img
          id="hero-image"
          src="@/assets/images/hero-demo.gif"
          class="w-full w-full object-cover object-center transform ease-in-out transition-transform duration-400"
          alt="A demo showing Frictless app interface"
        />
        <div
          class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-1/3"
        ></div>
      </div>
    </div>
  </section>
</template>