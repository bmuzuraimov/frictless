<template>
    <section class="py-14">
    <div class="max-w-screen-xl mx-auto md:px-8">
      <div class="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
        <div class="flex-1 rounded-xl md:block lg:block">
          <img
            src="@/assets/images/cta-right.png"
            class="md:max-w-lg rounded-xl"
            alt=""
          />
        </div>
        <div class="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
          <h3 class="text-3xl lg:text-4xl font-ourfit text-secondary-800 font-semibold text-center lg:text-left">Focus Where It Counts</h3>
          <!-- <p class="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Build your SaaS solution with help from our experts
          </p> -->
          <p class="mt-3 text-lg lg:text-xl font-ourfit leading-normal text-gray-600 text-center lg:text-left">
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
    </div>
  </section>
</template>