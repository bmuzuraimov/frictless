<template>
  <section class="max-w-screen-xl mx-auto px-4 py-12 sm:py-28 gap-8 sm:gap-12 text-gray-600 md:px-8">
    <div class="space-y-4 sm:space-y-5 max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto text-center">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-ourfit text-gray-800 font-semibold mx-auto">
        Meet Acuella:
        <span class="text-transparent bg-clip-text bg-gradient-to-b from-primary-700 to-primary-300">
          The Simple Way to Become Better Version of Yourself
        </span>
      </h2>
      <p class="text-sm sm:text-md font-ourfit leading-normal text-gray-600 mx-auto">
        Got a lot in your life? We hear you. Life's busy, and your to-do list is never-ending.
        Acuella is here to help you to sleep with a clear plan for tomorrow.
      </p>
      <p class="text-xs sm:text-sm text-indigo-600 font-medium">Clearer mind everyday</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-3 sm:space-y-0">
        <router-link
          to="/login"
          class="animate-fade-in rounded-full border border-black bg-black px-4 py-1.5 text-xs sm:text-sm text-ourfit text-white transition-all hover:bg-white hover:text-black"
        >
          Start for Free
        </router-link>
        <router-link
          to="/guide"
          class="animate-fade-in rounded-full border border-black px-4 py-1.5 text-xs sm:text-sm text-ourfit transition-all hover:bg-white hover:text-black"
        >
          Learn More
        </router-link>
      </div>
    </div>
    <div class="mt-8 sm:mt-14 h-[300px] md:h-[500px] overflow-y-auto shadow-lg rounded-lg">
      <img src="@/assets/images/hero-demo.png" class="w-full shadow-lg rounded-lg border border-white object-contain" alt="A demo showing Acuella app interface" />
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'HeroComponent',
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
@media (min-width: 1024px) {
  ::-webkit-scrollbar {
    display: block;
  }
  * {
    scrollbar-width: auto;
  }
}
</style>
