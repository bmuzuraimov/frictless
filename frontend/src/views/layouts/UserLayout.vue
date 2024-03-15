<template>
    <div class="flex">
      <div class="fixed left-0 h-screen w-16 bg-gray-800">
        <sidebar></sidebar>
      </div>
      <div class="flex flex-col w-full">
        <navbar class=""></navbar>
        <div class="flex-grow overflow-y-auto">
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import Navbar from '@/components/user/NavbarComponent.vue'
  import Sidebar from '@/components/user/SidebarComponent.vue'
  
  export default {
    components: {
      Navbar,
      Sidebar,
    }
  }
  </script>