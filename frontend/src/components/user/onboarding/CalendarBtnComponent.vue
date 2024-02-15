<template>
  <div
    class="inline-flex items-center gap-x-4 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700"
  >
    <img src="@/assets/images/apple_cal.png" class="h-8 w-8 mr-1" />
    <span class="flex items-center">Apple Calendar</span>
    <v-btn variant="outlined" @click="openModal">{{
      useCalendarStore.connectAppleCalendarButton.text
    }}</v-btn>
  </div>
</template>
<script lang="ts">
import { useCalendarStore } from '@/stores/user/calendarStore'
export default {
  mounted() {
    if (this.$userDecoded.is_ios_connected) {
      useCalendarStore().connectAppleCalendarButton.text = 'Connected'
      useCalendarStore().connectAppleCalendarButton.disabled = true
    }
  },
  data() {
    return {
      useCalendarStore: useCalendarStore()
    }
  },
  methods: {
    openModal() {
      this.useCalendarStore.toggleModal()
    }
  }
}
</script>
