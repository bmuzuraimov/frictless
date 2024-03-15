<template>
  <UserLayout>
    <main>
        <div class="p-4 sm:ml-64">
          <div
            class="p-4 border-2 border-gray-200 border-dashed rounded-lg  mt-14"
          >
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-4xl font-extrabold leading-tight tracking-tight text-gray-900">
              Agenda for 15 Februrary 2024
            </h2>

            <div class="mt-4">
              <a
                v-if="authStore.user.notion.template_url"
                :href="authStore.user.notion.template_url"
                title=""
                class="inline-flex items-center text-lg font-medium text-primary-600 hover:underline"
              >
                Manage in Notion
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div class="flow-root max-w-3xl mx-auto mt-8 sm:mt-12 lg:mt-16">
            <div
              class="-my-4 divide-y divide-gray-200"
              v-for="activity in agenda"
              :key="activity.end"
            >
              <div
                class="flex flex-col border-b border-gray-200 mt-2 gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center"
              >
                <p class="w-32 text-lg font-normal text-gray-500 sm:text-right shrink-0">
                  {{ activity.start }} - {{ activity.end }}
                </p>
                <h3 class="text-lg font-semibold text-gray-900">
                  <a :href="activity.link" class="hover:underline">{{ activity.title }}</a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </UserLayout>
</template>
<script lang="ts">
import UserLayout from '@/views/layouts/UserLayout.vue';
import { useAuthStore } from '@/stores/common/authStore';
export default {
  components: {
    UserLayout
  },
  data() {
    return {
      authStore: useAuthStore(),
      notion_href: useAuthStore().user.notion.template_url,
      agenda: [
        {
          title: 'Bathroom',
          start: '7:40',
          end: '7:55',
          completion: 0,
          link: ''
        },
        {
          title: 'Breakfast',
          start: '7:55',
          end: '8:20',
          completion: 0,
          link: ''
        },
        {
          title: '🚶🏻‍♂️ to classroom',
          start: '8:20',
          end: '8:30',
          completion: 0,
          link: ''
        },
        {
          title: 'COMP4136 Lecture',
          start: '8:30',
          end: '11:20',
          completion: 0,
          link: ''
        },
        {
          title: '🚶🏻‍♂️ to lunch',
          start: '11:20',
          end: '11:30',
          completion: 0,
          link: ''
        },
        {
          title: 'Lunch',
          start: '11:30',
          end: '12:20',
          completion: 0,
          link: ''
        },
        {
          title: '🚶🏻‍♂️ to classroom',
          start: '12:20',
          end: '12:30',
          completion: 0,
          link: ''
        },
        {
          title: 'COMP4025 Lab',
          start: '12:30',
          end: '14:20',
          completion: 0,
          link: ''
        },
        {
          title: 'COMP3065 Lecture 03 notes',
          start: '14:20',
          end: '15:40',
          completion: 0,
          link: 'https://www.notion.so/COMP3065-Lecture-03-notes-3de7c9198822421f80d1d1d3f0817b59'
        },
        {
          title: 'Break',
          start: '15:40',
          end: '15:50',
          completion: 0,
          link: ''
        },
        {
          title: 'COMP4025 Lecture 03',
          start: '15:50',
          end: '16:00',
          completion: 0,
          link: 'https://www.notion.so/COMP4025-Lecture-03-8554b8708dc146178f50b0b51722ca28'
        },
        {
          title: 'Break',
          start: '16:00',
          end: '16:10',
          completion: 0,
          link: ''
        },
        {
          title: '🚶🏻‍♂️ to dinner',
          start: '16:10',
          end: '16:20',
          completion: 0,
          link: ''
        },
        {
          title: 'COMP4025 Lecture 02',
          start: '16:20',
          end: '16:30',
          completion: 0,
          link: 'https://www.notion.so/COMP4025-Lecture-02-bfb6c86eb7bc40b497998f0224455899'
        },
        {
          title: 'Break',
          start: '16:30',
          end: '16:40',
          completion: 0,
          link: ''
        },
        {
          title: 'Dinner',
          start: '16:40',
          end: '17:40',
          completion: 0,
          link: ''
        },
        {
          title: 'COMP4135 Lecture 3',
          start: '18:20',
          end: '19:20',
          completion: 0,
          link: 'https://www.notion.so/COMP4135-Lecture-3-db8afb999ce54e00b806afca7c3fe4d8'
        },
        {
          title: 'Break',
          start: '19:20',
          end: '19:30',
          completion: 0,
          link: ''
        },
        {
          title: 'COMP4136 Lecture 02',
          start: '19:30',
          end: '21:00',
          completion: 0,
          link: 'https://www.notion.so/COMP4136-Lecture-02-8e8767ac440d4451b144d18d646c50bd'
        },
        {
          title: 'Break',
          start: '21:00',
          end: '21:10',
          completion: 0,
          link: ''
        },
        {
          title: 'COMP3065 Lecture 02 notes',
          start: '21:10',
          end: '22:45',
          completion: 0,
          link: 'https://www.notion.so/COMP3065-Lecture-02-notes-b4f570ceaffd41b9958c7a3460133da3'
        },
        {
          title: 'Break',
          start: '22:45',
          end: '22:55',
          completion: 0,
          link: ''
        },
        {
          title: 'Shower',
          start: '23:10',
          end: '23:50',
          completion: 0,
          link: ''
        },
        {
          title: 'Sleep',
          start: '23:50',
          end: '23:55',
          completion: 0,
          link: ''
        }
      ]
    }
  }
}
</script>
