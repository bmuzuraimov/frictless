import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@auth0/auth0-vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/notion_callback',
      name: 'notion_callback',
      component: () => import('@/views/NotionCallbackView.vue'),
      // beforeEnter: authGuard
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/404View.vue')
    },
  ]
})

export default router
