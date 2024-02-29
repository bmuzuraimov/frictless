<template>
  <!-- dark:[a-zA-Z0-9-_:\/]+(?=[\s"]) -->
  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <router-link to="/" class="flex ms-2 md:me-24">
            <img src="@/assets/images/logo.png" class="h-5 me-3" />
          </router-link>
        </div>
        <div class="flex items-center">
          <div class="relative items-center ms-3">
            <div>
              <button
                type="button"
                class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                @click="toggleDropdown"
              >
                <span class="sr-only">Open user menu</span>
                <!-- <img
                  class="w-8 h-8 rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjl3amxnEjLAx4ge4gTVA8LVUMAoixrVZLboSwdNuJJA&s"
                  alt="user photo"
                /> -->
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center bg-primary-600 text-white"
                >
                  {{ $userDecoded.email.charAt(0).toUpperCase() }}
                </div>
              </button>
            </div>
            <div
              class="absolute right-0 top-6 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow"
              v-if="isOpen"
            >
              <div class="py-1" role="none">
                <router-link
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  to="/profile"
                >
                  {{
                    $userDecoded.email.length > 14
                      ? $userDecoded.email.slice(0, 14) + '...'
                      : $userDecoded.email
                  }}
                </router-link>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    >Dashboard</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    >Settings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    >Notion</a
                  >
                </li>
                <li @click="logout">
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    >Sign out</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'NavbarComponent',
  data() {
    return {
      isOpen: false,
      user: this.$userDecoded
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    async logout() {
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  }
}
</script>
