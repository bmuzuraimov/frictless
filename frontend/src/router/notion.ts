const notionRoutes = [
    {
      path: '/notion_scheduler/:userId',
      name: 'Notion Scheduler',
      component: () => import('@/views/notion/NotionSchedulerView.vue'),
    },
  ]
  
  export default notionRoutes
  