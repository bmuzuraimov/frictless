<template>
  <div class="pattern-boxes pattern-blue-200 pattern-bg-white pattern-size-2 pattern-opacity-10">
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
    <!-- <TestimonialsComponent /> -->
    <!-- Join waitinglist -->
    <WaitlistComponent />
    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<script lang="ts">
import NavbarComponent from '@/components/common/home/NavbarComponent.vue'
import HeroComponent from '@/components/common/home/HeroComponent.vue'
import FeatureComponent from '@/components/common/home/FeatureComponent.vue'
import CTARightComponent from '@/components/common/home/CTARightComponent.vue'
import CTALeftComponent from '@/components/common/home/CTALeftComponent.vue'
import StatsComponent from '@/components/common/home/StatsComponent.vue'
import PricingComponent from '@/components/common/home/PricingComponent.vue'
import TimeCalculatorComponent from '@/components/common/home/TimeCalculatorComponent.vue'
import FooterComponent from '@/components/common/home/FooterComponent.vue'
import FAQComponent from '@/components/common/home/FAQComponent.vue'
// import TestimonialsComponent from '@/components/common/home/TestimonialsComponent.vue'
import WaitlistComponent from '@/components/common/home/WaitlistComponent.vue'

export default {
  components: {
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
    // TestimonialsComponent,
    WaitlistComponent,
  },
}
</script>
