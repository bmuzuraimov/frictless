<template>
  <nav class="bg-white w-full md:static">
    <div class="items-center justify-center px-4 py-2 max-w-screen-xl mx-auto md:flex md:px-8">
      <div class="flex items-center justify-between py-3 md:py-5 md:block">
        <a href="javascript:void(0)">
          <img src="@/assets/images/logo.png" width="120" height="50" alt="Float UI logo" />
        </a>
        <div class="md:hidden">
          <button
            class="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
            @click="menuOpen()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
              :class="[open ? 'block' : 'hidden']"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              :class="[open ? 'hidden' : 'block']"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex-1 justify-self-center md:block" :class="[open ? 'block' : 'hidden']">
        <ul class="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
          <li
            v-for="link in navigation"
            :key="link.router"
            class="text-gray-600 text-ourfit hover:text-black"
          >
            <a :href="link.router">
              {{ link?.title }}
            </a>
          </li>
          <li v-if="!isAuthenticated" class="md:hidden text-gray-600 text-ourfit hover:text-black">
            <router-link to="/login">Login </router-link>
          </li>
          <li class="md:hidden text-gray-600 text-ourfit hover:text-black">
            <router-link
              to='/overview'
              v-if="isAuthenticated"
              class="md:hidden text-gray-600 text-ourfit hover:text-black"
            >
              Dashboard
            </router-link>
          </li>
          <li class="md:hidden text-gray-600 text-ourfit hover:text-black">
            <button @click="logout" v-if="isAuthenticated">Logout</button>
          </li>
        </ul>
      </div>
      <div class="hidden md:inline-block">
        <router-link
          to='/overview'
          v-if="isAuthenticated"
          class="animate-fade-in rounded-full border border-black bg-black px-4 py-1.5 text-sm text-ourfit text-white transition-all hover:bg-white hover:text-black"
        >
          Dashboard
        </router-link>
        <button
          @click="logout"
          v-if="isAuthenticated"
          class="animate-fade-in px-4 py-1.5 text-sm font-medium text-gray-500 transition-colors text-ourfit ease-out hover:text-black"
        >
          Logout
        </button>
        <router-link
          to="/login"
          v-if="!isAuthenticated"
          class="animate-fade-in rounded-full border border-black bg-black px-4 py-1.5 text-sm text-ourfit text-white transition-all hover:bg-white hover:text-black"
        >
          Login
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('token'),
      navigation: [
        { title: 'Story', router: '/story' },
        { title: 'Mission', router: '/mission' },
        { title: 'Guide', router: '/guide' }
      ],
      open: false
    }
  },
  methods: {
    menuOpen() {
      this.open = !this.open
    },
    async logout() {
      localStorage.removeItem('token')
      this.isAuthenticated = false
      this.$router.push('/')
    }
  }
}
</script>
