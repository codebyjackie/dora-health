import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () => import('@/views/home/HomePage.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'profile',
          component: () => import('@/views/profile/ProfilePage.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'edit-user-info',
          component: () => import('@/views/profile/EditProfile.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'about',
          component: () => import('@/views/profile/AboutPage.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const token = authStore.token

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: 'Login' })
    } else {
      if (isTokenExpired(token)) {
        try {
          await authStore.refreshToken()
          next()
        } catch (error) {
          next({ name: 'Login' })
        }
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

// 辅助函数：检查 token 是否过期
function isTokenExpired(token) {
  const payload = JSON.parse(atob(token.split('.')[1]))
  return payload.exp < Date.now() / 1000
}

export default router
