<template>
  <v-btn
    density="comfortable"
    size="x-large"
    rounded="xl"
    elevation="2"
    :ripple="false"
    @click="schedule"
    :disabled="schedulerStore.button.disabled"
    :class="schedulerStore.button.tw_class"
  >
    <img
      v-show="!schedule_animation_2"
      src="@/assets/images/schedule.png"
      class="w-5 h-8 mr-4"
      :style="schedule_animation_1 ? { animation: 'spinRocket 1s ease-in-out forwards' } : {}"
    />
    <img
      v-show="schedule_animation_2"
      src="@/assets/images/schedule-action.gif"
      class="w-5 h-12 rotate-90"
      :style="schedule_animation_2 ? { animation: 'moveRight 2s ease-in-out forwards' } : {}"
    />
    <span class="text-lg fonr-mont">{{ schedulerStore.button.text }}</span>
  </v-btn>
</template>

<script lang="ts">
import { useSchedulerStore } from '@/stores/user/schedulerStore'
import { useAuthStore } from '@/stores/common/authStore'
export default {
  name: 'SchedulerComponent',
  data() {
    return {
      authStore: useAuthStore(),
      schedule_animation_1: false,
      schedule_animation_2: false,
      schedulerStore: useSchedulerStore(),
    }
  },
  methods: {
    async schedule() {
      this.schedule_animation_1 = true
      setTimeout(() => {
        this.schedule_animation_1 = false
        this.schedule_animation_2 = true
        setTimeout(() => {
          this.schedule_animation_2 = false
        }, 1500)
      }, 2500)
      this.schedulerStore.schedule(this.authStore.user._id)
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
