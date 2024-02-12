<template>
    <div v-if="visible" class="fixed right-2 top-2">
      <div
        :class="`flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${toastClass}`"
        role="alert"
      >
        <div
          :class="`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${iconBackgroundClass}`"
        >
          <slot name="icon">
            <!-- default icon slot -->
            <svg
              class="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <!-- default path for icon, can be overridden -->
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
              />
            </svg>
          </slot>
        </div>
        <div class="ms-3 text-sm font-normal">
          <slot>{{ message }}</slot>
        </div>
        <button
          @click="close"
          type="button"
          class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            class="w-3 h-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
      props: {
          message: {
              type: String,
              default: 'Message goes here'
          },
          visible: {
              type: Boolean,
              default: false
          },
          toastType: {
              type: String,
              default: 'success' // can be 'success', 'error', 'info', etc.
          }
      },
      computed: {
          toastClass() {
              // Add different classes based on toast type
              switch (this.toastType) {
                  case 'success':
                      return 'text-green-500';
                  case 'error':
                      return 'text-red-500';
                  case 'info':
                      return 'text-blue-500';
                  // Add more cases as needed
                  default:
                      return 'text-green-500';
              }
          },
          iconBackgroundClass() {
              switch (this.toastType) {
                  case 'success':
                      return 'bg-green-100 dark:bg-green-800 dark:text-green-200';
                  case 'error':
                      return 'bg-red-100 dark:bg-red-800 dark:text-red-200';
                  case 'info':
                      return 'bg-blue-100 dark:bg-blue-800 dark:text-blue-200';
                  default:
                      return 'bg-green-100 dark:bg-green-800 dark:text-green-200';
              }
          }
      },
      methods: {
          close() {
              this.$emit('close');
          },
      }
  }
  </script>
  <style>
  </style>
  