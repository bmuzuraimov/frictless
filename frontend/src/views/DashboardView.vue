<template>
  <ConnectAppleCalendarComponent :isModal="isModal" @close-modal="isModal = false"/>
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
                <li class="flex flex-row justify-between my-2">
                  <span class="flex items-center"
                    ><img src="@/assets/images/apple_cal.svg" class="h-6 w-6 mr-1" />Apple
                    Calendar</span
                  >
                  <v-btn variant="outlined" @click="openModal">{{ useButtonStore.connectAppleCalendarButton.text }}</v-btn>
                </li>
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
                <span class="text-lg fonr-mont">{{
                  useButtonStore.connectNotionButton.text
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
<script lang="ts">
import SidebarComponent from '../components/dashboard/SidebarComponent.vue'
import ConnectAppleCalendarComponent from '@/components/dashboard/ConnectAppleCalendarComponent.vue';
import { useButtonStore } from '@/stores/buttonStore'
import { useUserStore } from '@/stores/user';

export default {
  components: {
    SidebarComponent,
    ConnectAppleCalendarComponent
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
      useButtonStore: useButtonStore(),
      useUserStore: useUserStore()
    }
  },
  mounted(){
    if (this.$userDecoded.is_ios_connected){
      this.useButtonStore.connectAppleCalendarButton.text = 'Connected';
      this.useButtonStore.connectAppleCalendarButton.disabled = true;
    }
    if (this.$userDecoded.is_notion_connected){
      this.useButtonStore.connectNotionButton.text = 'Linked';
      this.useButtonStore.connectNotionButton.disabled = true;
    }
  },
  methods: {
    openModal() {
      this.isModal = true;
    },
    async schedule() {
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