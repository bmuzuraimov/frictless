<template>
  <div>
    <section class="leading-relaxed max-w-screen-xl my-8 sm:my-12 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="space-y-2 sm:space-y-3 text-center">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-ourfit text-secondary-800 font-semibold">Frequently Asked Questions</h1>
      </div>
      <div class="mt-10 sm:mt-14 max-w-3xl mx-auto">
        <div
          v-for="(item, index) in faqs"
          :key="index"
          class="space-y-2 sm:space-y-3 mt-4 sm:mt-5 overflow-hidden border-b"
          @click="toggleFaq(index)"
        >
          <h4
            class="cursor-pointer pb-4 sm:pb-5 flex items-center justify-between text-base sm:text-lg text-gray-700 font-medium"
          >
            {{ item.q }}
            <svg
              v-if="selectedFaq === index"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-500 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-500 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </h4>
          <div
            v-show="selectedFaq === index"
            class="transition-[max-height,opacity] overflow-hidden duration-500 ease-in-out"
            :style="{ maxHeight: selectedFaq === index ? '1000px' : '0px' }"
          >
            <div>
              <p class="text-base sm:text-lg font-ourfit leading-normal text-gray-600 pb-4">{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
export default {
  data(){
    return{
      selectedFaq: -1,
      faqs: [
        {
          q: 'Why Frictless?',
          a: "Amidst the noise of endless tasks and deadlines, the essence of your goals can get lost. Frictless is here to ensure they don't. By transforming your overwhelming schedules into a structured symphony of daily and tomorrow's tasks, Frictless lets you focus on what truly matters—achieving remarkable outcomes."
        },
        {
          q: 'Who\'s It For?',
          a: "Students, freelancers, professionals—anyone who's tired of feeling swamped by their schedule. If you're looking for a way to cut through the chaos and get your priorities straight, Frictless's here for you."
        },
        {
          q: 'Why Choose Frictless?',
          a: "No More Overwhelm, Focus on Today and Tomorrow, Tailored to You: Your day, your tasks. We fit them into your time, not the other way around."
        },
        {
          q: 'Real Talk: Why Frictless Rocks',
          a: 'No fluff, no fuss—just a straightforward way to get your tasks in order.'
        },
      ],
    }
  },
  methods:{
    toggleFaq(index: number) {
      this.selectedFaq = this.selectedFaq === index ? -1 : index
    }
  }
}
</script>