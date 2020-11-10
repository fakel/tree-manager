const routes = [
  {
    name: 'login',
    path: '/',
    component: () => import('layouts/Login.vue'),
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'online',
        path: '',
        component: () => import('pages/treeInfo/Send.vue'),
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
            name: 'editInfo',
            path: 'editInfo',
            component: () => import('pages/treeInfo/EditInfo.vue'),
          },
          {
            name: 'harvest',
            path: 'harvest',
            component: () => import('pages/treeInfo/Harvest.vue'),
          },
          {
            name: 'flower',
            path: 'flower',
            component: () => import('pages/treeInfo/Flower.vue'),
          },
          {
            name: 'fruit',
            path: 'fruit',
            component: () => import('pages/treeInfo/Fruit.vue'),
          },
          {
            name: 'prunning',
            path: 'prunning',
            component: () => import('pages/treeInfo/Prunning.vue'),
          },
          {
            name: 'healt',
            path: 'healt',
            component: () => import('pages/treeInfo/Healt.vue'),
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
