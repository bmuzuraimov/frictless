import { createRouter, createWebHistory } from 'vue-router'
import userRoutes from './user';
import commonRoutes from './common';
import AOS from "aos";
import 'aos/dist/aos.css';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...userRoutes,
    ...commonRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/common/404View.vue'),
      meta: { requiresAuth: false }
    },
  ]
})

router.beforeEach((to, from, next) => {
  AOS.init();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem('token');
  if (requiresAuth && !isAuthenticated) {
    next('/unauthorized');
  } else {
    next();
  }
});

export default router
