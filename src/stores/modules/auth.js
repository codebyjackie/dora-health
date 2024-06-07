import { defineStore } from 'pinia'
import { ref } from 'vue'
import { refreshTokenService } from '@/api/auth' // 引入你的刷新 token 服务

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const refreshToken = async () => {
      try {
        const response = await refreshTokenService()
        const newToken = response.data.token
        console.log(response.message)
        setToken(newToken)
        return { token: newToken }
      } catch (error) {
        console.error('Token refresh failed:', error)
        throw error
      }
    }

    return {
      token,
      setToken,
      refreshToken
    }
  },
  {
    persist: true
  }
)
