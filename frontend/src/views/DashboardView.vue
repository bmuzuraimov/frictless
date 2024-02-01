<template>
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
                </li>
                <li class="flex flex-row justify-between my-2">
                  <span class="flex items-center"
                    ><img src="@/assets/images/apple_cal.svg" class="h-6 w-6 mr-1" />Apple
                    Calendar</span
                  >
                  <v-btn variant="outlined"> Connect </v-btn>
                </li>
                <li class="flex flex-row justify-between my-2">
                  <span class="flex items-center"
                    ><img src="@/assets/images/caldav.svg" class="h-6 w-6 mr-1" />CalDav
                    (Beta)</span
                  >
                  <v-btn variant="outlined"> Connect </v-btn>
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
              <a
                @click="schedule"
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
                <span class="text-lg fonr-mont">Schedule plan</span>
              </a>
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
import axios from 'axios'

export default {
  components: {
    SidebarComponent
  },
  data() {
    return {
      error: '',
      is_linked: false,
      user: this.$auth0.user,
    }
  },
  computed: {
    userId(): any {
      return this.user ? this.user.sub : { email: '', email_verified: false, family_name: '', given_name: '', locale: '', name: '', nickname: '', picture: '', sub: '', updated_at: '' }
    }
  },
  mounted(){
    console.log(this.userId);
  },
  methods: {
    async schedule() {
      const response = await axios.post('/api/schedule', {
        userId: this.userId
      })
    },
    async handleNotionOauth2() {
      if (this.is_linked) return
      this.error = ''
      // TODO: convert to Pinia later
      localStorage.setItem('userId', this.userId);
      window.open(
        import.meta.env.VITE_NOTION_TEMPLATE_URL,
        '_blank'
      )
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
        localStorage.removeItem('notionAuthStatus');
        this.error = 'Something went wrong. Please try again.'
      }
    }
  }
}
</script>

<style>
</style>