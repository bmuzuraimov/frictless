import { createRouter, createWebHistory } from 'vue-router'
import userRoutes from './user'
import commonRoutes from './common'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'

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
    }
  ]
})

router.beforeEach((to, from, next) => {
  AOS.init()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const isAuthenticated = localStorage.getItem('token')
  if (requiresAuth && !isAuthenticated) {
    next('/unauthorized')
  } else {
    next()
  }
})

router.beforeEach(async (to, from, next) => {
  AOS.init();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const scope = to.meta.scope;
  const token = localStorage.getItem('token');
  const lastCheckedTimestamp = localStorage.getItem('bbAB9HUN2Zdrerheh9yCsrLjOa9NOB7K'); // lastChecked datetime
  const now = new Date();

  if (requiresAuth && !token) {
    next('/unauthorized');
  } else if (requiresAuth && token) {
    // Convert lastCheckedTimestamp from string to Date
    const lastChecked = lastCheckedTimestamp ? new Date(parseInt(lastCheckedTimestamp)) : null;

    // Check if the last verification was within the last 60 seconds (60000 ms)
    if (lastChecked && now.getTime() - lastChecked.getTime() < 1200000) {
      // Skip verification, use the recent check as valid
      next();
    } else {
      // Perform a new verification
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const route = '/api/auth/user_verify'; // Example API route
        await axios.post(route, { scope }, config);

        // Update lastChecked in localStorage
        localStorage.setItem('bbAB9HUN2Zdrerheh9yCsrLjOa9NOB7K', now.getTime().toString());
        
        next();
      } catch (error:any) {
        // On error, clear token and lastChecked
        localStorage.removeItem('token');
        localStorage.removeItem('bbAB9HUN2Zdrerheh9yCsrLjOa9NOB7K');
        next('/unauthorized');
      }
    }
  } else {
    next(); // No auth required, proceed as normal
  }
});

export default router
