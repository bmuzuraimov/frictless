<template>
  <section data-aos="fade-in" data-aos-easing="ease-in-sine" data-aos-duration="1000" class="relative max-w-screen-xl mx-auto py-6 px-4 sm:px-8">
    <div class="absolute top-0 left-0 w-full h-full bg-white opacity-40"></div>
    <div class="relative z-10 gap-5 items-center lg:flex">
      <div class="flex-1 rounded-xl mt-4 sm:mt-5 mx-auto sm:w-9/12 lg:mt-0 lg:w-auto">
        <img
            src="@/assets/images/cta-right.png"
            class="w-full rounded-xl"
            alt=""
          />
      </div>
      <div class="flex-1 max-w-lg py-5 sm:mx-auto sm:text-center lg:max-w-xl lg:text-left">
        <h3 class="text-3xl sm:text-4xl font-ourfit text-secondary-800 font-semibold">Focus Where It Counts</h3>
        <p class="mt-2 sm:mt-3 text-lg sm:text-xl font-ourfit leading-normal text-gray-600">
          Merge your tasks with your calendar seamlessly. Acuella brings clarity to your day, helping you prioritize and focus on what truly moves the needle.
        </p>
        <router-link
            to="/guide"
            class="inline-flex gap-x-1 items-center text-primary-600 text-ourfit hover:text-primary-400 duration-150 font-medium"
          >
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </router-link>
      </div>
    </div>
  </section>
</template>