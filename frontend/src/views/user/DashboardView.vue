<template>
  <IOSConnectComponent :isModal="isModal" @close-modal="isModal = false" />
  <div class="flex flex-col md:flex-row h-screen">
    <SidebarComponent />
    <main class="md:w-5/6 md:m-10 w-full">
      <v-stepper :items="['Calendar', 'Notion', 'Shortcut', 'Scheduler']">
        <template v-slot:item.1>
          <v-card
            title="Connect your calendar to automatically check for busy times and new events as they’re
              scheduled."
            flat
          >
            <div class="border border-black rounded-lg p-5">
              <ul class="border border-black rounded-lg p-5">
                <li class="flex flex-row justify-between my-2">
                  <span class="flex items-center"
                    ><img src="@/assets/images/apple_cal.svg" class="h-6 w-6 mr-1" />Apple
                    Calendar</span
                  >
                  <v-btn variant="outlined" @click="openModal">{{
                    useButtonStore.connectAppleCalendarButton.text
                  }}</v-btn>
                </li>
              </ul>
            </div>
          </v-card>
        </template>

        <template v-slot:item.2>
          <v-card title="Get Notion template" flat>
            <div class="flex flex-col justify-center items-center py-4">
              <!-- Error message -->
              <p class="text-red-500 text-sm font-mont my-1" v-if="error">
                {{ error }}
              </p>
              <v-btn
                density="comfortable"
                size="x-large"
                rounded="lg"
                elevation="2"
                :disabled="useButtonStore.connectNotionButton.disabled"
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
                <span class="text-lg fonr-mont">{{ useButtonStore.connectNotionButton.text }}</span>
              </v-btn>
            </div>
          </v-card>
        </template>
        <template v-slot:item.3>
          <v-card title="Step Three" flat>
            <div class="flex flex-col justify-center items-center py-4">
              <v-btn
                @click="downloadShortcut"
                density="comfortable"
                size="x-large"
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
                Copy the code below and paste in the shortcut
              </p>
              <div class="flex flex-row items-center space-x-2">
                <input
                  v-model="ios_userId"
                  placeholder="iOS User ID"
                  class="w-full bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent rounded-md text-gray-700 py-2 px-4 leading-tight transition duration-150 ease-in-out"
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
          </v-card>
        </template>
        <template v-slot:item.4>
          <v-card title="Step Four" flat>
            <div class="flex flex-col justify-center items-center py-4">
              <v-btn
                density="comfortable"
                size="x-large"
                rounded="xl"
                elevation="2"
                :ripple="false"
                @click="schedule"
                :disabled="useButtonStore.scheduleButton.disabled"
                :class="useButtonStore.scheduleButton.tw_class"
              >
                <img
                  v-show="!schedule_animation_2"
                  src="@/assets/images/schedule.png"
                  class="w-5 h-8 mr-4"
                  :style="
                    schedule_animation_1 ? { animation: 'spinRocket 3s ease-in-out forwards' } : {}
                  "
                />
                <img
                  v-show="schedule_animation_2"
                  src="@/assets/images/schedule-action.gif"
                  class="w-5 h-12 rotate-90"
                  :style="
                    schedule_animation_2 ? { animation: 'moveRight 3s ease-in-out forwards' } : {}
                  "
                />
                <span class="text-lg fonr-mont">{{ useButtonStore.scheduleButton.text }}</span>
              </v-btn>
            </div>
          </v-card>
        </template>
      </v-stepper>
    </main>
  </div>
</template>
<script lang="ts">
import SidebarComponent from '@/components/user/dashboard/SidebarComponent.vue'
import IOSConnectComponent from '@/components/user/dashboard/IOSConnectComponent.vue'
import { useButtonStore } from '@/stores/buttonStore'
import { useUserStore } from '@/stores/user'

export default {
  components: {
    SidebarComponent,
    IOSConnectComponent
  },
  data() {
    return {
      copyBtnText: 'Copy',
      ios_userId: this.$userDecoded.ios_userId,
      schedule_animation_1: false,
      schedule_animation_2: false,
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
    if (this.$userDecoded.is_ios_connected) {
      this.useButtonStore.connectAppleCalendarButton.text = 'Connected'
      this.useButtonStore.connectAppleCalendarButton.disabled = true
    }
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
    openModal() {
      this.isModal = true
    },
    async schedule() {
      this.schedule_animation_1 = true
      setTimeout(() => {
        this.schedule_animation_1 = false // Assuming you want to reset the first animation state
        this.schedule_animation_2 = true
        setTimeout(() => {
          this.schedule_animation_2 = false
        }, 3000)
      }, 3000)
      this.useButtonStore.schedule(this.$userDecoded.userId)
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

<style>
@keyframes spinRocket {
  0% {
    transform: rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: rotate(90deg);
    opacity: 0.8;
  }
}
@keyframes moveRight {
  0% {
    transform: translateX(-5px) rotate(90deg);
    opacity: 0.8;
  }
  100% {
    transform: translateX(180px) rotate(90deg);
    opacity: 1;
  }
}
</style>
