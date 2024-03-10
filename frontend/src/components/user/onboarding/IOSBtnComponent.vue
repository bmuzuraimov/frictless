<template>
  <div
    class="inline-flex items-center gap-x-4 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700"
  >
    <img src="@/assets/images/apple_cal.png" class="h-8 w-8 mr-1" />
    <span class="flex items-center">Apple Calendar</span>
    <v-btn 
    variant="outlined" @click="openModal">{{
      calendarStore.connectAppleCalendarButton.text
    }}</v-btn>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/common/authStore'
import { useCalendarStore } from '@/stores/user/calendarStore'

export default defineComponent({
  setup() {
    const calendarStore = useCalendarStore()
    const authStore = useAuthStore()
    const userDecoded = ref<any>(null)

    onMounted(() => {
      if (authStore.user.ios_device?.email && authStore.user.ios_device?.password) {
        calendarStore.connectAppleCalendarButton.text = 'Connected'
        calendarStore.connectAppleCalendarButton.disabled = true
      }
    })

    const openModal = () => {
      calendarStore.toggleModal()
    }

    return {
      calendarStore,
      userDecoded,
      openModal
    }
  }
})
</script>
