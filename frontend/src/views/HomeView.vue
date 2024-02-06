<template>
  <div class="pattern-boxes pattern-blue-200 pattern-bg-white pattern-size-2 pattern-opacity-10">
    <!-- Banner section -->
    <BannerComponent />
    <!-- Navbar -->
    <NavbarComponent />
    <!-- Hero section -->
    <HeroComponent />
    <!-- CTARight section -->
    <CTARightComponent />
    <!-- CTALeft section -->
    <CTALeftComponent />
    <!-- Features section -->
    <FeatureComponent />
    <!-- Stats section -->
    <StatsComponent />
    <!-- TimeCalculator section -->
    <TimeCalculatorComponent />
    <!-- Pricing section -->
    <PricingComponent />
    <!-- FAQ section -->
    <FAQComponent />
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
import TimeCalculatorComponent from '@/components/home/TimeCalculatorComponent.vue'
import FooterComponent from '@/components/home/FooterComponent.vue'
import FAQComponent from '@/components/home/FAQComponent.vue'
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
    TimeCalculatorComponent,
    FooterComponent,
    FAQComponent,
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
