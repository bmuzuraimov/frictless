<template>
  <div class="flex flex-col md:flex-row h-screen">
    <SidebarComponent />
    <main class="md:w-5/6 md:m-10 w-full">
      <h1 class="text-4xl font-extrabold leading-tight tracking-tight text-gray-900">Overview</h1>
      
    </main>
  </div>
</template>
<script lang="ts">
import SidebarComponent from '@/components/user/dashboard/SidebarComponent.vue'

export default {
  components: {
    SidebarComponent,
  },
}
</script>


