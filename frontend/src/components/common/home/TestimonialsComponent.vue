<template>
  <section class="relative py-10 sm:py-14">
    <div class="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto sm:text-center">
        <h3 class="text-gray-800 text-2xl sm:text-3xl lg:text-4xl font-semibold">
          What Winner Say
        </h3>
        <p class="mt-2 sm:mt-3 text-gray-600 text-base sm:text-lg">
          Hear it straight from the folks who've made their days better with Acuella. Less anxiety,
          more doing.
        </p>
      </div>
      <div class="mt-8 sm:mt-12">
        <ul class="grid items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition duration-300 ease-in-out"
          >
            <div class="p-4">
              <svg
                class="w-8 h-8 text-gray-300"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <!-- SVG content -->
              </svg>
            </div>
            <figure>
              <blockquote>
                <p class="text-lg font-ourfit leading-normal text-gray-600 px-4 py-2">
                  {{ testimonial.feedback }}
                </p>
              </blockquote>
              <figcaption class="flex items-center gap-x-4 p-4 mt-4 bg-indigo-50">
                <img
                  :src="testimonial.image"
                  class="w-14 h-14 rounded-full border-2 border-indigo-500"
                />
                <div>
                  <span class="block text-gray-800 font-semibold">{{ testimonial.name }}</span>
                  <span class="block text-indigo-600 text-sm">Senior Software Engineer</span>
                </div>
              </figcaption>
            </figure>
          </li>
        </ul>
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
export default {
  name: 'TestimonialsComponent',
  data() {
    return {
      testimonials: [
        {
          name: 'Destiny Uche',
          role: 'Senior Software Engineer',
          image: 'https://randomuser.me/api/portraits/men/91.jpg',
          feedback:
            'Finding Acuella was a turning point for managing my academic and personal tasks.'
        },
        {
          name: 'Nargiz Seisek',
          role: 'MSc Student',
          image: 'https://randomuser.me/api/portraits/women/79.jpg',
          feedback:
            'Great product! I have been using Acuella for a while now and it elevated my productivity.'
        },
        {
          name: 'Andrew Wong',
          role: 'UI/UX Designer',
          image: 'https://randomuser.me/api/portraits/men/86.jpg',
          feedback: 'Acuella is a game changer. It has helped me to be more organized and focused.'
        }
      ]
    }
  }
}
</script>
