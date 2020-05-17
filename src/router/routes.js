const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Chats',
        component: () => import('pages/Index.vue')
      }
    ]
  },
  {
    path: '/2',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: 'sign-in',
        name: 'SignIn',
        component: () => import('pages/SignIn.vue')
      },
      {
        path: 'sign-up',
        name: 'SignUp',
        component: () => import('pages/SignUp.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
