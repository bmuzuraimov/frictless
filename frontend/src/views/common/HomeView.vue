<template>
  <div class="pattern-boxes pattern-blue-200 pattern-bg-white pattern-size-2 pattern-opacity-10">
    <!-- Navbar -->
    <NavbarComponent />
    <!-- Hero section -->
    <HeroComponent />
    <!-- CTARight section -->
    <CTAOneComponent />
    <!-- CTALeft section -->
    <CTATwoComponent />
    <!-- CTARight section -->
    <CTAThreeComponent />
    <!-- Features section -->
    <FeatureComponent />
    <!-- Stats section -->
    <!-- <StatsComponent /> -->
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
import CTAOneComponent from '@/components/common/home/CTAOneComponent.vue'
import CTATwoComponent from '@/components/common/home/CTATwoComponent.vue'
import CTAThreeComponent from '@/components/common/home/CTAThreeComponent.vue'
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
    CTAOneComponent,
    CTATwoComponent,
    CTAThreeComponent,
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
