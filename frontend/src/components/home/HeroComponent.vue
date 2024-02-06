<template>
  <section class="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
    <div class="space-y-5 max-w-4xl mx-auto text-center">
      <h2 class="text-4xl font-ourfit text-gray-800 font-semibold mx-auto md:text-5xl">
        Meet Acuella:
        <span class="text-transparent bg-clip-text bg-gradient-to-b from-primary-700 to-primary-300"
          >The Simple Way to Become Better Version of Yourself</span
        >
      </h2>
      <p class="text-md font-ourfit leading-normal text-gray-600 my-12 mx-auto">
        Got a lot in your life? We hear you. Life's busy, and your to-do list is never-ending.
        Acuella is here to help you to sleep with a clear plan for tomorrow
      </p>
      <p class="text-sm text-indigo-600 font-medium">Clearer mind everyday</p>
      <div class="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
        <router-link
          to="/login"
          class="animate-fade-in rounded-full border border-black bg-black px-4 py-1.5 text-sm text-ourfit text-white transition-all hover:bg-white hover:text-black"
        >
          Start for Free
        </router-link>
        <router-link
          to="/guide"
          class="animate-fade-in rounded-full border border-black px-4 py-1.5 text-sm text-ourfit transition-all hover:bg-white hover:text-black"
        >
          Learn More
        </router-link>
      </div>
    </div>
    <!-- hide scroll bar -->
    <div class="mt-14 h-[500px] overflow-y-scroll shadow-lg rounded-lg ">
      <img src="@/assets/images/hero-demo.png" class="w-full shadow-lg rounded-lg border border-white object-contain" alt="" />
    </div>
  </section>
</template>

<script lang="ts">
export default {
  data() {
    return {
      user: this.$auth0.user
    }
  },
  methods: {
    // Login with Auth0 and store the user in the Vuex store
    login() {
      this.$auth0.loginWithRedirect()
    }
  }
}
</script>
<style scoped>
::-webkit-scrollbar {
  display: none;
}
* {
  scrollbar-width: none;
}
</style>
