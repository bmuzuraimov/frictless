<template>
  <NavbarComponent />
  <slot></slot>
  <FooterComponent />
</template>

<script lang="ts">
import NavbarComponent from '@/components/common/home/NavbarComponent.vue'
import FooterComponent from '@/components/common/home/FooterComponent.vue'

export default {
  components: {
    NavbarComponent,
    FooterComponent
  }
}
</script>
