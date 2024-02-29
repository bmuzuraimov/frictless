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
              v-model="useAppleCalendarInstance.formData.ios_email"
              type="email"
              id="email"
              class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="useAppleCalendarInstance.formData.ios_password"
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
            {{ useAppleCalendarInstance.submitAppleCalendarButton.text }}
          </button>
        </form>
        <div class="mt-4">
          <ol class="list-decimal pl-5 space-y-1 text-sm">
            <li>Sign in to <a href="https://appleid.apple.com" target="_blank" class="text-blue-600 hover:underline">appleid.apple.com</a>.</li>
            <li>Select App-Specific Passwords in the Sign-In and Security section.</li>
            <li>Follow the steps on your screen to generate an app-specific password.</li>
            <li>Enter the app-specific password into the password field of the app.</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  <!-- End of Modal for Apple Calendar -->
</template>
<script lang="ts">
import { useAuthStore } from '@/stores/common/authStore';
import { useAppleCalendar } from '@/stores/user/appleCalendar'
import { useCalendarStore } from '@/stores/user/calendarStore';
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const useAppleCalendarInstance = useAppleCalendar();
    const useCalendarStoreInstance = useCalendarStore();
    const useAuthStoreInstance = useAuthStore();

    onMounted(async () => {
      await getIosEmail();
    });

    const isModal = computed(() => useCalendarStoreInstance.is_modal);

    const getIosEmail = async () => {
      await useAppleCalendarInstance.get_ios_email(useAuthStoreInstance.user.userId);
    };

    const closeModal = () => {
      useCalendarStoreInstance.toggleModal();
    };

    const submitAppleCalendar = () => {
      useAppleCalendarInstance.formData.userId = useAuthStoreInstance.user.userId;
      useAppleCalendarInstance.submitAppleCalendar();
    };

    return {
      isModal,
      closeModal,
      useAppleCalendarInstance,
      submitAppleCalendar
    };
  }
}
</script>

