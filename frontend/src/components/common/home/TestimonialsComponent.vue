<template>
  <section class="relative py-10 sm:py-14">
    <div class="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto sm:text-center">
        <h3 class="text-gray-800 text-2xl sm:text-3xl lg:text-4xl font-semibold">
          What Early Users Say
        </h3>
        <p class="mt-2 sm:mt-3 text-gray-600 text-base sm:text-lg">
          Hear it straight from the folks who've made their days better with Frictless.
        </p>
      </div>
      <div class="mt-8 sm:mt-12">
        <ul class="grid items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition duration-300 ease-in-out"
          >
            <figure>
              <blockquote>
                <p class="text-lg font-ourfit leading-normal text-gray-600 px-6 py-4">
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
                  <span class="block text-indigo-600 text-sm">{{ testimonial.role }}</span>
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
          name: 'Destiny',
          role: 'Freelance Writer',
          image: './images/testimonial_user_1.jpg',
          feedback:
            "I've always struggled with planning my day efficiently, often feeling overwhelmed by the sheer volume of tasks. Frictless changed that for me. The way it seamlessly organizes my tasks and calendar has freed up so much of my time and mental space. Now, I spend more time creating and less time stressing. It's the simplest yet most effective tool I've used."
        },
        {
          name: 'Bex',
          role: 'Graphic Designer',
          image: './images/testimonial_user_2.jpg',
          feedback:
          "After integrating Frictless into my daily workflow, I've noticed a significant shift in how I manage my time. It's like having a personal assistant that knows exactly what I need to focus on. My days are more structured, and I'm finally able to dedicate time to projects that matter most. It's a game-changer for anyone juggling multiple tasks and deadlines."
        },
        {
          name: 'Sarar',
          role: 'Startup Founder',
          image: './images/testinomial_user_3.jpg',
          feedback: "Running a startup means constant chaos and a never-ending to-do list. Frictless has been a revelation for managing my daily tasks and keeping me on track. The 'Revive' feature alone has saved my schedule multiple times. It's not just about doing more; it's about doing what's right for the business. I can't recommend Frictless enough to anyone in a fast-paced environment."
        }
      ]
    }
  }
}
</script>
