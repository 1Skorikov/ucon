const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: 'chats',
    children: [
      {
        path: 'chats',
        name: 'Chats',
        meta: { navbarTitle: 'Ucon' },
        component: () => import('pages/Index.vue')
      },
      {
        path: 'account',
        name: 'Account',
        component: () => import('pages/Account.vue')
      },
      {
        path: 'recipient-selector',
        name: 'RecipientSelector',
        meta: { navbarTitle: 'Select recipient' },
        component: () => import('pages/RecipientSelector.vue')
      }
    ]
  },
  {
    path: '/e',
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
  },
  {
    path: '/room',
    component: () => import('layouts/ChatLayout.vue'),
    children: [
      {
        path: 'chat',
        name: 'Chat',
        component: () => import('pages/Chat.vue')
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
