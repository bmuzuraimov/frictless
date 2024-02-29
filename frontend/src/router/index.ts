import { createRouter, createWebHistory } from 'vue-router'
import userRoutes from './user'
import notionRoutes from './notion'
import commonRoutes from './common'
import { useAuthStore } from '@/stores/common/authStore';
import AOS from 'aos'
import 'aos/dist/aos.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...userRoutes,
    ...commonRoutes,
    ...notionRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/common/404View.vue'),
      meta: { requiresAuth: false }
    }
  ]
})

router.beforeEach((to, from, next) => {
  AOS.init();
  const authStore = useAuthStore();
  const requiresAuth = to.meta.requiresAuth;
  const scope = to.meta.scope;

  if (requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login page
    next({ name: 'login' });
  } else if (requiresAuth && scope) {
    const userRole = authStore.user?.scope; // Assuming your user object includes a role property

    if (Array.isArray(scope) && userRole && !scope.includes(userRole)) {
      // User role not in allowed scope
      next({ name: 'access-denied' });
    } else if (typeof scope === 'string' && userRole !== scope) {
      // User role does not match the required scope
      next({ name: 'access-denied' });
    } else {
      // User is authenticated and has the correct role
      next();
    }
  } else {
    // Route does not require auth or user is authenticated
    next();
  }
});

export default router
