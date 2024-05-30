import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () => import('@/views/home/HomePage.vue')
        },
        {
          path: 'profile',
          component: () => import('@/views/profile/ProfilePage.vue'),
          children: [
            {
              path: 'about',
              component: () => import('@/views/profile/AboutPage.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
