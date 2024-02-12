<template>
  <footer class="text-gray-500 bg-white/30 backdrop-blur-md px-4 py-5 max-w-screen-xl mx-auto">
    <div class="max-w-lg mx-auto text-center">
      <img src="@/assets/images/logo.png" class="w-32 mx-auto" />
      <p class="leading-relaxed mt-2 text-[15px]">
        Stay connected with Acuella for the latest updates, tips, and more. Follow us on our social media channels and subscribe to our newsletter for productivity insights delivered straight to your inbox.
      </p>
    </div>
    <ul class="flex items-center justify-center mt-8 space-x-4">
      <li v-for="item in footerNavs" :key="item.name" class="hover:text-gray-800">
        <router-link :to="item.href">
          {{item.name}}
        </router-link>
      </li>
    </ul>
    <div class="flex flex-col sm:flex-row items-center justify-between mt-8">
      <div>
        &copy; 2024 Acuella All rights reserved.
      </div>
      <div class="flex items-center space-x-4 mt-4 sm:mt-0">
        <li v-for="icon in socialIcons" :key="icon.id" class="w-10 h-10 border rounded-full flex items-center justify-center">
          <a :href="icon.link">
            <svg class="svg-icon w-6 h-6" :class="icon.color" viewBox="0 0 20 20">
              <!-- SVG path here -->
            </svg>
          </a>
        </li>
      </div>
    </div>
  </footer>
</template>

  
  <script lang="ts">
  export default {
    data: function () {
      return {
        socialIcons: [
          {
            id: 1,
            link: 'https://www.facebook.com/acuella',
            color: 'text-blue-500',
          },
          {
            id: 2,
            link: 'https://www.twitter.com/acuella',
            color: 'text-blue-400',
          },
          {
            id: 3,
            link: 'https://www.instagram.com/acuella',
            color: 'text-pink-500',
          },
          {
            id: 4,
            link: 'https://www.linkedin.com/acuella',
            color: 'text-blue-800',
          },
        ],
        footerNavs: [
          {
            href: '/story',
            name: 'Story'
          },
          {
            href: '/mission',
            name: 'Mission'
          },
          {
            href: '/guide',
            name: 'Guide'
          },
          {
            href: '/privacy',
            name: 'Privacy'
          },
          {
            href: '/terms',
            name: 'Terms'
          },
        ]
      }
    },
  }
  </script>