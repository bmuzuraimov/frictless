<template>
  <h3 class="text-center text-3xl sm:text-4xl font-ourfit text-secondary-800 font-semibold">
    How Much Time Can Frictless Save You?
  </h3>
  <section
    class="flex flex-col justify-center md:flex-row mb-8 sm:mb-12 lg:mb-16 sm:mx-6 md:mx-12 lg:mx-24 py-4 sm:py-6 lg:py-8 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300 ease-in-out"
  >
    <div class="md:w-1/2 px-4 py-4 sm:py-6">
      <h4 class="text-lg sm:text-xl lg:text-2xl font-ourfit leading-normal text-gray-600">
        How many hours do you waste each day on manual typing, setting times for each task, and
        reflecting them?
      </h4>
      <h2 class="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold my-4">
        {{ time }} hours
      </h2>
      <v-slider
        v-model="time"
        :max="4"
        :min="1"
        :step="0.5"
        thumb-label="always"
        thumb-size="20"
        class="my-4 text-xl lg:text-2xl mx-auto w-full sm:w-3/4 md:w-1/2 font-ourfit text-secondary-600"
      ></v-slider>
      <div class="flex flex-col gap-y-2 md:flex-row md:gap-x-2 items-center justify-between my-2">
        <p class="text-lg sm:text-xl lg:text-2xl font-ourfit leading-normal text-gray-600">
          How much is one hour of your time worth to you?
        </p>
        <div class="relative text-secondary-700">
          <span class="h-6 absolute left-3 inset-y-0 my-auto">US&#x24;</span>
          <input
            type="number"
            v-model="renumeration"
            placeholder="50.00"
            class="text-lg pl-12 pr-16 py-2 appearance-none bg-transparent border border-gray-100 outline-none shadow-sm rounded-lg"
          />
          <div class="absolute inset-y-0 right-3 top-2 flex items-center">
            <span class="text-lg bg-transparent outline-none px-1 h-full">/hr</span>
          </div>
        </div>
      </div>
    </div>
    <div class="md:w-1/2 px-4 py-4 sm:py-6 font-ourfit md:border-l border-gray-200">
      <h4 class="text-lg sm:text-xl lg:text-2xl leading-normal text-success-600">
        Return on Investment Calculator
      </h4>
      <h2
        class="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold my-4"
        :class="warning_intensity[time]"
      >
        ${{ time * renumeration * 30 }}
      </h2>
      <div class="flex justify-between my-2 text-xs sm:text-sm md:text-base">
        <span>Frictless can save you</span>
        <span class="text-warning-700">{{ time * 30 }} hours per month.</span>
      </div>

      <div class="flex justify-between my-2 text-xs sm:text-sm md:text-base">
        <span>Frictless can save you</span>
        <span class="text-warning-700">${{ time * renumeration }} per day.</span>
      </div>

      <div class="flex justify-between my-2 text-xs sm:text-sm md:text-base">
        <span>Frictless monthly cost</span>
        <span class="text-success-700">$49.99.</span>
      </div>

      <div
        class="flex justify-between my-2 text-xs sm:text-sm md:text-base border-t border-gray-100 pt-2"
      >
        <span>Total monthly ROI with Freemium</span>
        <span class="text-success-700">${{ time * renumeration * 30 }}</span>
      </div>

      <div class="flex justify-between my-2 text-xs sm:text-sm md:text-base pt-2">
        <span>Total monthly ROI with Premium</span>
        <span class="text-success-700">${{ time * renumeration * 30 - 49.99 }}</span>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { ref } from 'vue'

export default {
  setup(){
    return {
      time: ref(2),
      warning_intensity: {
        1: 'text-red-400',
        1.5: 'text-red-400',
        2: 'text-red-500',
        2.5: 'text-red-500',
        3: 'text-red-600',
        3.5: 'text-red-700',
        4: 'text-red-800'
      } as { [key: number]: string },
      renumeration: ref(50)
    }
  }
}
</script>
