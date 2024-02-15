<template>
  <IOSConnectComponent/>
  <div class="flex flex-col md:flex-row h-screen">
    <SidebarComponent />
    <main class="p-4 md:w-5/6 md:p-16 lg:p-20 w-full overflow-y-scroll no-scrollbar">
      <ol class="relative border-s border-gray-200">
        <li class="mb-20 ms-6">
          <span
            class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white"
          >
            <svg
              class="w-2.5 h-2.5 text-blue-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
              />
            </svg>
          </span>
          <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900">
            Sync Your Calendar
            <span
              class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3"
              >Latest</span
            >
          </h3>
          <time class="block mb-2 text-sm font-normal leading-none text-gray-400"
            >Subscribed Since January 13th, 2022</time
          >
          <p class="mb-4 text-base font-normal text-gray-500">
            Connect your calendar to automatically check new plans as they are scheduled.
          </p>
          <CalendarBtnComponent/>
        </li>
        <li class="mb-20 ms-6">
          <span
            class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white"
          >
            <svg
              class="w-2.5 h-2.5 text-blue-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
              />
            </svg>
          </span>
          <h3 class="mb-1 text-lg font-semibold text-gray-900">Get Notion Template</h3>
          <time class="block mb-2 text-sm font-normal leading-none text-gray-400"
            >Linked on December 7th, 2024</time
          >
          <v-btn
            density="comfortable"
            size="x-large"
            rounded="xl"
            variant="outlined"
            elevation="2"
            :disabled="useButtonStore.connectNotionButton.disabled"
            @click="handleNotionOauth2()"
            :class="[
              'flex',
              'mt-4',
              'flex-row',
              'items-center',
              'justify-center',
              'p-5',
              'rounded-lg',
              'border',
              'hover:bg-gray-50'
            ]"
          >
            <img src="@/assets/images/notion.png" class="w-8 h-8 mr-2" />
            <span class="text-lg fonr-mont">{{ useButtonStore.connectNotionButton.text }}</span>
          </v-btn>
        </li>
        <li class="mb-20 ms-6">
          <span
            class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white"
          >
            <svg
              class="w-2.5 h-2.5 text-blue-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
              />
            </svg>
          </span>
          <h3 class="mb-1 text-lg font-semibold text-gray-900">iOS Shortcut</h3>
          <time class="block mb-2 text-sm font-normal leading-none text-gray-400"
            >Last Installed on December 2nd, 2024</time
          >
          <div class="my-8">
            <v-btn
              @click="downloadShortcut"
              density="comfortable"
              size="x-large"
              variant="outlined"
              rounded="xl"
              elevation="2"
              :class="[
                'flex',
                'flex-row',
                'items-center',
                'justify-center',
                'p-5',
                'rounded-lg',
                'border',
                'hover:bg-gray-50'
              ]"
            >
              <img src="@/assets/images/siri.png" class="w-8 h-8 mr-2" />
              Install IOS Shortcut
            </v-btn>
            <p class="font-mont leading-normal my-2">
              Copy the code below and paste it into the shortcut:
            </p>
            <div class="flex flex-row items-center space-x-2">
              <input
                v-model="ios_userId"
                placeholder="iOS User ID"
                class="bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent rounded-md text-gray-700 py-2 px-4 leading-tight transition duration-150 ease-in-out"
              />
              <v-btn
                color="outline"
                density="comfortable"
                rounded="lg"
                elevation="1"
                @click="copyToClipboard"
                >{{ copyBtnText }}</v-btn
              >
            </div>
          </div>
        </li>
        <li class="mb-40 ms-6">
          <span
            class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white"
          >
            <svg
              class="w-2.5 h-2.5 text-blue-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
              />
            </svg>
          </span>
          <h3 class="mb-1 text-lg font-semibold text-gray-900">Magic sauce</h3>
          <time class="block mb-2 text-sm font-normal leading-none text-gray-400"
            >Last Scheduled on December 2nd, 2024</time
          >
          <SchedulerComponent/>
        </li>
      </ol>
    </main>
  </div>
</template>
<script lang="ts">
import CalendarBtnComponent from '@/components/user/onboarding/CalendarBtnComponent.vue'
import SchedulerComponent from '@/components/user/SchedulerBtnComponent.vue'
import SidebarComponent from '@/components/user/SidebarComponent.vue'
import IOSConnectComponent from '@/components/user/onboarding/IOSConnectComponent.vue'
import { useButtonStore } from '@/stores/buttonStore'
import { useUserStore } from '@/stores/user'

export default {
  components: {
    CalendarBtnComponent,
    SidebarComponent,
    IOSConnectComponent,
    SchedulerComponent
},
  data() {
    return {
      copyBtnText: 'Copy',
      ios_userId: this.$userDecoded.ios_userId,
      formData: {
        userId: '',
        ios_email: '',
        ios_password: ''
      },
      isModal: false,
      error: '',
      is_linked: false,
      useButtonStore: useButtonStore(),
      useUserStore: useUserStore()
    }
  },
  mounted() {
    if (this.$userDecoded.is_notion_connected) {
      this.useButtonStore.connectNotionButton.text = 'Linked'
      this.useButtonStore.connectNotionButton.disabled = true
    }
  },
  methods: {
    downloadShortcut() {
      window.open(import.meta.env.VITE_BASE_URL + '/bro.shortcut', '_blank')
    },
    copyToClipboard() {
      if (this.ios_userId) {
        navigator.clipboard
          .writeText(this.ios_userId)
          .then(() => {
            this.copyBtnText = 'Copied'
          })
          .catch((err) => {
            console.error('Failed to copy text: ', err)
          })
      }
    },
    async handleNotionOauth2() {
      if (this.is_linked) return
      this.error = ''
      window.open(import.meta.env.VITE_NOTION_TEMPLATE_URL, '_blank')
      const start = new Date().getTime()
      while (
        localStorage.getItem('notionAuthTab') == 'true' ||
        localStorage.getItem('notionAuthStatus') == 'pending'
      ) {
        await new Promise((r) => setTimeout(r, 1000))
        if (new Date().getTime() - start > 60000) {
          localStorage.setItem('notionAuthStatus', 'failed')
          localStorage.setItem('notionAuthTab', 'false')
          this.is_linked = false
          break
        }
      }
      if (localStorage.getItem('notionAuthStatus') == 'success') {
        this.is_linked = true
      } else {
        localStorage.removeItem('notionAuthStatus')
        this.error = 'Something went wrong. Please try again.'
      }
    }
  }
}
</script>
