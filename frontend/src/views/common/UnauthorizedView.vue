<template>
  <main>
    <div class="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
      <div class="max-w-lg mx-auto text-gray-600">
        <div class="space-y-3 text-center">
          <h3 class="text-indigo-600 font-semibold">404 Error</h3>
          <p class="text-gray-800 text-4xl font-semibold sm:text-5xl">Unauthorized</p>
          <p>Sorry, you are not authorized to access this page.</p>
        </div>
        <div class="mt-12">
          <ul class="divide-y">
            <li v-for="(item, idx) in navigations" :key="idx" class="flex gap-x-4 py-6">
              <div
                class="flex-none w-14 h-14 bg-indigo-50 rounded-full text-indigo-600 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                  v-html="item.icon"
                ></svg>
              </div>
              <div class="space-y-1">
                <h4 class="text-gray-800 font-medium">{{ item.title }}</h4>
                <p>
                  {{ item.desc }}
                </p>
                <router-link
                  :to="item.href"
                  class="text-sm text-indigo-600 duration-150 hover:text-indigo-400 font-medium inline-flex items-center gap-x-1"
                >
                  Visit
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/common/authStore';
export default {
  mounted() {
    this.useAuthStore.logout()
  },
  data() {
    return {
      useAuthStore: useAuthStore(),
      navigations: [
        {
          icon: '<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>',
          title: 'Login',
          desc: 'Signin to your dashboard',
          href: '/login'
        },
        {
          icon: '<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>',
          title: 'Guide',
          desc: 'How to get most out of our platform',
          href: '/guide'
        },
        {
          icon: '<path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>',
          title: 'Mission',
          desc: 'Read about our mission',
          href: '/mission'
        }
      ]
    }
  }
}
</script>
