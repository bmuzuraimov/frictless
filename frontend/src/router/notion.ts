const notionRoutes = [
    {
      path: '/notion_scheduler/:userId',
      name: 'Notion Scheduler',
      component: () => import('@/views/notion/MenuBar.vue'),
    },
  ]
  
  export default notionRoutes
  