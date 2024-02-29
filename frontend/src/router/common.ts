

const commonRoutes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/common/HomeView.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/privacy',
        name: 'privacy',
        component: () => import('@/views/common/PrivacyView.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/terms',
        name: 'terms',
        component: () => import('@/views/common/TermsView.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/story',
        name: 'story',
        component: () => import('@/views/common/StoryView.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/guide',
        name: 'guide',
        component: () => import('@/views/common/GuideView.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/mission',
        name: 'mission',
        component: () => import('@/views/common/MissionView.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/common/LoginView.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/confirm-code',
        name: 'confirm-code',
        component: () => import('@/views/common/ConfirmCodeView.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: '/unauthorized',
        name: 'access-denied',
        component: () => import('@/views/common/UnauthorizedView.vue'),
        meta: { requiresAuth: false }
      },
]

export default commonRoutes