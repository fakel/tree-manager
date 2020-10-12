const routes = [
  {
    path: '/',
    component: () => import('layouts/Login.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('pages/Index.vue'),
      },
      {
        name: 'offline',
        path: 'offline',
        component: () => import('pages/IndexOffline.vue'),
      },
      {
        name: 'treeoffline',
        path: 'treeoffline',
        component: () => import('pages/TreeOffline.vue'),
        redirect: '/dashboard/treeoffline/info',
        children: [
          {
            name: 'info',
            path: 'info',
            component: () => import('pages/treeInfo/Info.vue'),
          },
          {
            name: 'harvest',
            path: 'harvest',
            component: () => import('pages/treeInfo/Harvest.vue'),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
