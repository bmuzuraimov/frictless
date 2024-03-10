<template>
  <UserLayout>
    <IOSFormComponent />
    <main>
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14">
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
              </h3>
              <time v-if="ios_connected_on" class="block mb-2 text-sm font-normal leading-none text-gray-400"
                >Subscribed since {{ ios_connected_on }}</time
              >
              <time v-else class="block mb-2 text-sm font-normal leading-none text-gray-400"
                >Not connected</time>
              <p class="mb-4 text-base font-normal text-gray-500">
                Connect your calendar to automatically check new plans as they are scheduled.
              </p>
              <IOSBtnComponent />
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
              <time v-if="notion_connected_on" class="block mb-2 text-sm font-normal leading-none text-gray-400"
                >Linked on {{ notion_connected_on }}</time
              >
              <time v-else class="block mb-2 text-sm font-normal leading-none text-gray-400"
                >Not connected yet</time>
              <NotionBtnComponent />
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
                    disabled="true"
                    v-model="authStore.user.ios_device.shortcut_id"
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
              <SchedulerComponent />
            </li>
          </ol>
        </div>
      </div>
    </main>
  </UserLayout>
</template>

<script lang="ts">
import UserLayout from '@/views/layout/UserLayout.vue'
import IOSBtnComponent from '@/components/user/onboarding/IOSBtnComponent.vue'
import SchedulerComponent from '@/components/user/SchedulerBtnComponent.vue'
import NotionBtnComponent from '@/components/user/onboarding/NotionBtnComponent.vue'
import IOSFormComponent from '@/components/user/onboarding/IOSFormComponent.vue'
import { useButtonStore } from '@/stores/buttonStore'
import { useAuthStore } from '@/stores/common/authStore';

export default {
  components: {
    UserLayout,
    IOSBtnComponent,
    IOSFormComponent,
    NotionBtnComponent,
    SchedulerComponent
  },
  data() {
    return {
      copyBtnText: 'Copy',
      error: '',
      is_linked: false,
      authStore: useAuthStore(),
      useButtonStore: useButtonStore(),
    }
  },
  computed: {
    ios_connected_on() {
      return this.authStore.user?.ios_device.connected_on
    },
    notion_connected_on() {
      return this.authStore.user?.notion.connected_on
    },
  },
  methods: {
    downloadShortcut() {
      window.open(import.meta.env.VITE_BASE_URL + '/bro.shortcut', '_blank')
    },
    copyToClipboard() {
      if (this.authStore.user?.ios_device?.shortcut_id) {
        navigator.clipboard
          .writeText(this.authStore.user?.ios_device?.shortcut_id)
          .then(() => {
            this.copyBtnText = 'Copied'
          })
          .catch((err) => {
            alert('Failed to copy text')
          })
      }
    },
  }
}
</script>