<template>
  <v-btn
    density="comfortable"
    size="x-large"
    rounded="xl"
    elevation="2"
    :ripple="false"
    @click="schedule"
    :class="notionStore.notionButton.tw_class"
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
    <span class="text-lg fonr-mont">{{ notionStore.notionButton.text }}</span>
  </v-btn>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useNotionStore } from '@/stores/notion/useNotionStore'

export default {
  name: 'SchedulerComponent',
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const schedule_animation_1 = ref(false)
    const schedule_animation_2 = ref(false)
    const notionStore = useNotionStore()

    const schedule = async () => {
      if (props.userId == null) {
        return
      }
      schedule_animation_1.value = true
      setTimeout(() => {
        schedule_animation_1.value = false
        schedule_animation_2.value = true
        setTimeout(() => {
          schedule_animation_2.value = false
        }, 1500)
      }, 2500)
      notionStore.schedule(props.userId)
    }

    return {
      notionStore,
      schedule_animation_1,
      schedule_animation_2,
      schedule
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