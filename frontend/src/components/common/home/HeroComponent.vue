<template>
  <section
    class="max-w-screen-xl mx-auto px-4 py-12 sm:py-28 gap-8 sm:gap-12 text-gray-600 md:px-8"
  >
    <div class="space-y-4 sm:space-y-5 max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto text-center">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-ourfit text-gray-800 font-semibold mx-auto">
        Tomorrow's
        <span
          class="text-transparent bg-clip-text bg-gradient-to-b from-primary-700 to-primary-300"
        >
        Priority Scheduler
        </span>
      </h2>
      <p class="text-sm sm:text-md font-ourfit leading-normal text-gray-600 mx-auto">
        Got a lot in your life? We hear you. Life's busy, and your to-do list is never-ending.<br/>
        Acuella is here to help you to wake up with a clear plan.
      </p>
      <p class="text-xs sm:text-sm text-indigo-600 font-medium">Clearer mind everyday</p>
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-3 sm:space-y-0"
      >
        <router-link
          to="/login"
          class="rounded-full border border-black bg-black px-4 py-1.5 text-xs sm:text-sm text-outfit text-white hover:bg-white hover:text-black"
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
      <div class="relative w-full h-[300px] md:h-[600px] overflow-hidden">
        <img
          id="hero-image"
          src="@/assets/images/hero-demo.png"
          class="w-full w-full object-cover object-center transform ease-in-out transition-transform duration-400"
          alt="A demo showing Acuella app interface"
        />
        <div
          class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-1/2"
        ></div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
export default {
  data() {
    return {
      // scale depending on screen size for md is 7 for smaller screens is 5
      y_scroll: 0,
      heroImageElement: document.getElementById('hero-image') // define type as HTMLElement
    }
  },
  mounted() {
    this.heroImageElement = document.getElementById('hero-image') as HTMLElement
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      let start = window.innerWidth > 768 ? 100 : 0;
      let scale = (window.innerWidth > 768 ? 3 : 2);
      this.y_scroll = window.scrollY
      if (this.heroImageElement && this.y_scroll > start) {
        const imageHeight = this.heroImageElement.clientHeight - (window.innerWidth > 768 ? 600 : 300)
        let transform = Math.min((this.y_scroll - start) * scale, imageHeight)
        transform = Math.max(transform, 0)
        ;(this.heroImageElement as HTMLElement).style.transform = `translateY(-${transform}px)`
      }else{
        ;(this.heroImageElement as HTMLElement).style.transform = `translateY(0px)`
      }
    }
  }
}
</script>
