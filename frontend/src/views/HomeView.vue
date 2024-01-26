<template>
  <div class="pattern-boxes pattern-blue-200 pattern-bg-white pattern-size-2 pattern-opacity-10">
  <!-- Banner section -->
  <BannerComponent />
  <!-- Navbar -->
  <NavbarComponent />
  <!-- Hero section -->
  <HeroComponent />
  <!-- Features section -->
  <FeatureComponent />
  <!-- CTARight section -->
  <CTARightComponent />
  <!-- CTALeft section -->
  <CTALeftComponent />
  <!-- Stats section -->
  <StatsComponent />
  <!-- Pricing section -->
  <PricingComponent />
  <!-- FAQ section -->
  <FAQComponent />
  <!-- CTACenter section -->
  <CTACenterComponent/>
  <!-- Testimonials -->
  <TestimonialsComponent />
  <!-- Footer -->
  <FooterComponent />
  </div>
</template>

<script lang="ts">
import BannerComponent from '@/components/home/BannerComponent.vue'
import NavbarComponent from '@/components/home/NavbarComponent.vue'
import HeroComponent from '@/components/home/HeroComponent.vue'
import FeatureComponent from '@/components/home/FeatureComponent.vue'
import CTARightComponent from '@/components/home/CTARightComponent.vue'
import CTALeftComponent from '@/components/home/CTALeftComponent.vue'
import StatsComponent from '@/components/home/StatsComponent.vue'
import PricingComponent from '@/components/home/PricingComponent.vue'
import FooterComponent from '@/components/home/FooterComponent.vue'
import FAQComponent from '@/components/home/FAQComponent.vue'
import CTACenterComponent from '@/components/home/CTACenterComponent.vue'
import TestimonialsComponent from '@/components/home/TestimonialsComponent.vue'

export default {
  components: {
    BannerComponent,
    NavbarComponent,
    HeroComponent,
    FeatureComponent,
    CTARightComponent,
    CTALeftComponent,
    StatsComponent,
    PricingComponent,
    FooterComponent,
    FAQComponent,
    CTACenterComponent,
    TestimonialsComponent
  },
  data() {
    return {
      // user: this.$auth0.user
    }
  },
  methods: {}
}
</script>
<!-- {
  "given_name": "IT Father",
  "nickname": "muzutaimov03",
  "name": "IT Father",
  "picture": "https://lh3.googleusercontent.com/a/ACg8ocIjymTsGyAvXhAbOHSTTn7PlbWz169CAM7Um--a5epDu0o=s96-c",
  "locale": "en",
  "updated_at": "2024-01-20T17:50:24.832Z",
  "email": "muzutaimov03@gmail.com",
  "email_verified": true,
  "sub": "google-oauth2|111538135395067690843"
} -->