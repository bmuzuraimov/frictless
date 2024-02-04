<template>
  <!-- Modal for Apple Calendar -->
  <div
    :class="{
      'hidden': !isModal,
      'fixed inset-0 z-50 flex items-center justify-center bg-grey opacity-90': isModal
    }"
  >
    <div class="w-full max-w-md p-6 opacity-100 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <!-- Modal header -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">App Specific Password</h3>
        <button
          @click="closeModal"
          type="button"
          class="text-gray-400 hover:text-gray-500 rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span class="sr-only">Close</span>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <!-- Modal body -->
      <div>
        <form @submit.prevent="submitAppleCalendar" class="shadow-sm space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="formData.ios_email"
              type="email"
              id="email"
              class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="formData.ios_password"
              type="password"
              id="password"
              class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {{ useButtonStore.submitAppleCalendarButton.text }}
          </button>
        </form>
        <div class="mt-4">
          <ol class="list-decimal pl-5 space-y-1 text-sm">
            <li>Sign in to <a href="https://appleid.apple.com" class="text-blue-600 hover:underline">appleid.apple.com</a>.</li>
            <li>Select App-Specific Passwords in the Sign-In and Security section.</li>
            <li>Follow the steps on your screen to generate an app-specific password.</li>
            <li>Enter the app-specific password into the password field of the app.</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  <!-- End of Modal for Apple Calendar -->
  <div class="flex flex-col md:flex-row h-screen">
    <SidebarComponent />
    <main class="md:w-5/6 md:m-10 w-full">
      <v-stepper :items="['Step 1', 'Step 2', 'Step 3']">
        <template v-slot:item.1>
          <v-card title="Connect your calendar" flat>
            <p>
              Connect your calendar to automatically check for busy times and new events as they’re
              scheduled.
            </p>
            <div class="border border-black rounded-lg p-5">
              <ul class="border border-black rounded-lg p-5">
                <!-- <li class="flex flex-row justify-between my-2">
                  <span class="flex items-center"
                    ><img src="@/assets/images/google_cal.svg" class="h-6 w-6 mr-1" />Google
                    Calendar</span
                  >
                  <v-btn variant="outlined"> Connect </v-btn>
                </li>
                <li class="flex flex-row justify-between my-2">
                  <span class="flex items-center"
                    ><img src="@/assets/images/outlook_cal.svg" class="h-6 w-6 mr-1" />Outlook
                    Calendar</span
                  >
                  <v-btn variant="outlined"> Connect </v-btn>
                </li> -->
                <li class="flex flex-row justify-between my-2">
                  <span class="flex items-center"
                    ><img src="@/assets/images/apple_cal.svg" class="h-6 w-6 mr-1" />Apple
                    Calendar</span
                  >
                  <v-btn variant="outlined" @click="closeModal">Connect</v-btn>
                </li>
                <!-- <li class="flex flex-row justify-between my-2">
                  <span class="flex items-center"
                    ><img src="@/assets/images/caldav.svg" class="h-6 w-6 mr-1" />CalDav
                    (Beta)</span
                  >
                  <v-btn variant="outlined"> Connect </v-btn>
                </li> -->
              </ul>
            </div>
          </v-card>
        </template>

        <template v-slot:item.2>
          <v-card title="Step Two" flat>
            <div class="flex flex-col justify-center items-center">
              <!-- Error message -->
              <p class="text-red-500 text-sm font-mont my-1" v-if="error">
                {{ error }}
              </p>
              <a
                disabled
                @click="handleNotionOauth2()"
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
                <img src="@/assets/images/notion.png" class="w-8 h-8 mr-2" />
                <span class="text-lg fonr-mont">{{
                  is_linked ? 'Linked Notion' : 'Get Notion Template'
                }}</span>
              </a>
            </div>
          </v-card>
        </template>
        <template v-slot:item.3>
          <v-card title="Step Three" flat>
            <div class="flex flex-col justify-center items-center">
              <button
                @click="schedule"
                :disabled="useButtonStore.scheduleButton.disabled"
                :class="useButtonStore.scheduleButton.tw_class"
              >
                <span class="text-lg fonr-mont">{{ useButtonStore.scheduleButton.text }}</span>
              </button>
            </div>
          </v-card>
        </template>
      </v-stepper>
    </main>
  </div>
</template>
<!-- setup meeting platforms: Zoom, Google meets, Discord, Jitsi Video, Whereby, Around, Huddle01, Riverside, Webex, 8x8, Tandem Video, Ping.gg -->
<script lang="ts">
import SidebarComponent from '../components/dashboard/SidebarComponent.vue'
import { useButtonStore } from '@/stores/buttonStore'

export default {
  components: {
    SidebarComponent
  },
  data() {
    return {
      formData: {
        userId: '',
        ios_email: '',
        ios_password: '',
      },
      isModal: false,
      error: '',
      is_linked: false,
      user: this.$auth0.user,
      useButtonStore: useButtonStore()
    }
  },
  computed: {
    userId(): any {
      return this.user
        ? this.user.sub
        : {
            email: '',
            email_verified: false,
            family_name: '',
            given_name: '',
            locale: '',
            name: '',
            nickname: '',
            picture: '',
            sub: '',
            updated_at: ''
          }
    }
  },
  mounted() {
    console.log(this.userId)
  },
  methods: {
    closeModal() {
      this.isModal = !this.isModal;
    },
    async submitAppleCalendar() {
      this.formData.userId = this.userId;
      this.useButtonStore.submitAppleCalendar(this.formData);
    },
    async schedule() {
      this.useButtonStore.schedule(this.userId)
    },
    async handleNotionOauth2() {
      if (this.is_linked) return
      this.error = ''
      localStorage.setItem('userId', this.userId)
      window.open(import.meta.env.VITE_NOTION_TEMPLATE_URL, '_blank')
      const start = new Date().getTime()
      while (
        localStorage.getItem('notionAuthTab') == 'true' ||
        localStorage.getItem('notionAuthStatus') == 'pending'
      ) {
        await new Promise((r) => setTimeout(r, 1000))
        if (new Date().getTime() - start > 30000) {
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