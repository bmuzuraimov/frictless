<template>
  <v-btn
    density="comfortable"
    size="x-large"
    rounded="xl"
    elevation="2"
    :ripple="false"
    @click="schedule"
    :disabled="useSchedulerStore.scheduleButton.disabled"
    :class="useSchedulerStore.scheduleButton.tw_class"
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
    <span class="text-lg fonr-mont">{{ useSchedulerStore.scheduleButton.text }}</span>
  </v-btn>
</template>

<script lang="ts">
import { useSchedulerStore } from '@/stores/user/schedulerStore'

export default {
  name: 'SchedulerComponent',
  data() {
    return {
      schedule_animation_1: false,
      schedule_animation_2: false,
      useSchedulerStore: useSchedulerStore(),
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
      this.useSchedulerStore.schedule(this.$userDecoded.userId)
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
