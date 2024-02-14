const userRoutes = [
  {
    path: '/overview',
    name: 'overview',
    component: () => import('@/views/user/OverviewView.vue'),
    meta: { 
      requiresAuth: true,
      scope: 'user'
    }
  },
  {
    path: '/agenda',
    name: 'agenda',
    component: () => import('@/views/user/AgendaView.vue'),
    meta: { 
      requiresAuth: true,
      scope: 'user'
    }
  },
  {
    path: '/onboarding',
    name: 'onboarding',
    component: () => import('@/views/user/OnboardingView.vue'),
    meta: { 
      requiresAuth: true,
      scope: 'user'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/user/ProfileView.vue'),
    meta: { 
      requiresAuth: true,
      scope: 'user',
    }
  },
  {
    path: '/notion_callback',
    name: 'notion_callback',
    component: () => import('@/views/user/NotionCallbackView.vue'),
    meta: { 
      requiresAuth: true,
      scope: 'user',
    }
  }
]

export default userRoutes
