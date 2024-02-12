const userRoutes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/user/DashboardView.vue'),
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
