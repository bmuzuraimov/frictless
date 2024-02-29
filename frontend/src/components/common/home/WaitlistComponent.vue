<template>
  <section class="relative py-10 sm:py-14">
    <div class="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-lg mx-auto sm:text-center">
        <h3 class="text-gray-800 text-2xl sm:text-3xl lg:text-4xl font-semibold">
          Join Our Waitlist
        </h3>
        <p class="mt-2 sm:mt-3 text-gray-600 text-base sm:text-lg">
          Be among the first to experience the future of frictionless living with Frictless. Sign up
          today to get early access.
        </p>
      </div>
      <div class="mt-8 sm:mt-12 flex justify-center">
        <form @submit.prevent="submitWaitinglist" class="flex flex-col sm:flex-row gap-4">
          <div class="flex-grow">
            <label for="email" class="sr-only">Email</label>
            <input
              type="email"
              v-model="email"
              id="email"
              autocomplete="email"
              placeholder="Enter your email..."
              required
              class="block w-full text-sm text-ourfit shadow-sm px-4 py-1.5 placeholder-gray-400 focus:ring-2 focus:ring-grey-500 focus:border-grey-500 border-gray-300 rounded-lg transition duration-150 ease-in-out"
            />
          </div>
          <div>
            <button
              type="submit"
              class="animate-fade-in rounded-sm border border-black bg-black px-4 py-1.5 text-sm text-ourfit text-white transition-all hover:bg-white hover:text-black"
            >
              Join the waitlist
            </button>
          </div>
        </form>
      </div>
    </div>
    <div
      class="absolute top-0 w-full h-[300px] sm:h-[350px]"
      style="
        background: linear-gradient(
          180deg,
          rgba(29, 94, 116, 0) 0%,
          rgba(29, 94, 116, 0.05) 25%,
          rgba(29, 94, 116, 0.1) 50%,
          rgba(29, 94, 116, 0.05) 75%,
          rgba(29, 94, 116, 0) 100%
        );
      "
    ></div>
  </section>
</template>
<script lang="ts">
import { ref } from 'vue'
import axios from 'axios';
export default {
  setup(){
    const email = ref('');
    const submitWaitinglist = () => {
      axios.post('/api/user/waitlist', { email: email.value })
        .then(() => {
          email.value = '';
          alert('You have been added to the waitlist');
        })
        .catch((err) => {
          console.error(err);
          alert('An error occurred. Please try again');
        });
    }
    return {
      email,
      submitWaitinglist
    }
  }
}
</script>