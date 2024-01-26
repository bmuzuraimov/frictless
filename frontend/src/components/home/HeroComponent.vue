<template>
  <section>
    <div class="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
      <div class="space-y-5 max-w-4xl mx-auto text-center">
        <h2 class="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl">
          Design your projects faster with
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]"
            >the largest figma UI kit</span
          >
        </h2>
        <p class="max-w-2xl mx-auto">
          Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium,
          totam rem aperiam, eaque ipsa quae.
        </p>
        <p class="text-sm text-indigo-600 font-medium">Build products for everyone</p>
        <div class="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
          <a
            href="javascript:void(0)"
            class="animate-fade-in rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
          >
            Start for Free
          </a>
          <a
            @click="login"
            href="javascript:void(0)"
            class="animate-fade-in rounded-full border border-black px-4 py-1.5 text-sm transition-all hover:bg-white hover:text-black"
          >
            Learn More
          </a>
        </div>
      </div>
      <div class="mt-14">
        <img
          src="https://raw.githubusercontent.com/sidiDev/remote-assets/main/Safari%20(Big%20Sur)%20-%20Light.png"
          class="w-full shadow-lg rounded-lg border"
          alt=""
        />
      </div>
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
