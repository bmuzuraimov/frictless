<template>
  <h3 class="text-center text-4xl font-ourfit text-secondary-800 font-semibold">
    How Much Time Can Acuella Save You?
  </h3>
  <section
    class="flex flex-col justify-center md:flex-row mb-16 mx-24 md:mx-6 lg:mx-24 py-6 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300 ease-in-out"
  >
    <!-- left section -->
    <div class="md:w-1/2 px-4 py-6">
      <h4 class="text-xl font-ourfit leading-normal text-gray-600">
        How many hours do you waste each day on manual typing, setting times for each task, and
        reflecting them?
      </h4>
      <!-- Vuetify slider from 1 hour to 20 hours -->
      <h2 class="text-center text-2xl md:text-3xl lg:text-4xl font-bold my-4">{{ time }} hours</h2>
      <v-slider
        v-model="time"
        :max="4"
        :min="1"
        :step="0.5"
        thumb-label="always"
        thumb-size="12"
        class="my-4 text-2xl mx-auto w-1/2 font-ourfit text-secondary-600"
      ></v-slider>
      <!-- per hour renumeration -->
      <div class="flex flex-row items-center justify-between my-2">
        <p class="text-xl font-ourfit leading-normal text-gray-600">How much is one hour of your time worth to you?</p>
        <span class="font-medium text-2xl text-secondary-700"
          >$<input
            type="number"
            v-model="renumeration"
            class="w-14 py-1 focus:outline-none"
          />/hr</span
        >
      </div>
    </div>
    <!-- right section -->
    <div class="md:w-1/2 px-4 py-6 font-ourfit md:border-l border-gray-200">
      <h4 class="text-lg text-xl leading-normal text-success-600">Return on Investment Calculator</h4>
      <h2 class="text-center text-2xl md:text-3xl lg:text-4xl font-bold my-4" :class="warning_intensity[time]">
        ${{ time * renumeration * 30 }}
      </h2>
      <div class="flex justify-between my-2 text-sm md:text-base">
        <span>Acuella can save you</span>
        <span class="text-warning-700">{{ time * 30 }} hours per month.</span>
      </div>

      <div class="flex justify-between my-2 text-sm md:text-base">
        <span>Acuella can save you</span>
        <span class="text-warning-700">${{ time * renumeration }} per day.</span>
      </div>

      <div class="flex justify-between my-2 text-sm md:text-base">
        <span>Acuella monthly cost</span>
        <span class="text-success-700">$49.99.</span>
      </div>

      <div class="flex justify-between my-2 text-sm md:text-base border-t border-gray-100 pt-2">
        <span>Total monthly ROI with Freemium</span>
        <span class="text-success-700">${{ time * renumeration * 30 }}</span>
      </div>

      <div class="flex justify-between my-2 text-sm md:text-base pt-2">
        <span>Total monthly ROI with Premium</span>
        <span class="text-success-700">${{ time * renumeration * 30 - 49.99 }}</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  data() {
    return {
      time: 2,
      warning_intensity: {
        1: 'text-warning-300',
        1.5: 'text-warning-300',
        2: 'text-warning-400',
        2.5: 'text-warning-400',
        3: 'text-warning-500',
        3.5: 'text-warning-600',
        4: 'text-warning-700'
      } as { [key: number]: string },
      renumeration: 50
    }
  }
}
</script>
