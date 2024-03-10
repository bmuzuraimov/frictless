<template>
  <div class="w-screen h-screen flex justify-center align-center">
    <SchedulerComponent :userId="userId" />
  </div>
</template>
<script lang="ts">
import SchedulerComponent from '@/components/notion/ScheduleBtnComponent.vue'
export default {
  components: {
    SchedulerComponent
  },
  data() {
    return {
      userId: Array.isArray(this.$route.params.userId) ? this.$route.params.userId[0] : this.$route.params.userId || '',
    };
  },
}
</script>
