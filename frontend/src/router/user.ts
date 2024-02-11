const userRoutes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/user/DashboardView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/user/ProfileView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/notion_callback',
        name: 'notion_callback',
        component: () => import('@/views/user/NotionCallbackView.vue'),
        meta: { requiresAuth: true }
      },
]

export default userRoutes
