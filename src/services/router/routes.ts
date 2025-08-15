
export const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/pages/Auth/LoginPage.vue'),
    meta: {
        requiresGuest: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/HomePage.vue'),
    meta: {
        requiresAuth: true
    }
  },
  {
    path: '/collaborators',
    name: 'collaborators',
    component: () => import('@/pages/Collaborator/Index.vue'),
    meta: {
        requiresAuth: true
    }
  },
  {
    path: '/collaborators/:id',
    name: 'collaborator',
    component: () => import('@/pages/Collaborator/Show.vue'),
    meta: {
        requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutPage.vue'),
    meta: {
        requiresAuth: true
    }
  },
  {
    path: "/",
    redirect: "/dashboard"
  }
]