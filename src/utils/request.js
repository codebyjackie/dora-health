import axios from 'axios'
import router from '@/router'
import { useAuthStore } from '@/stores'
import { showNotify } from 'vant'

const baseURL = 'http://192.168.36.46:3000'

const instance = axios.create({
  baseURL,
  timeout: 10000
})

// Instance interceptors for request and response
// Request interceptor: Checks if there's a token in the user store, and if so, adds it to the request header
instance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = 'Bearer ' + authStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// Response interceptor: Checks if the response status is 200, 201, 204, or 206, and if so, returns the data
// If not, shows a notification with an error message, and returns a rejected promise
instance.interceptors.response.use(
  ({ data }) => {
    if (data.code === 0) {
      return data
    }
    showNotify({ type: 'danger', message: data.message || 'Service Error' })
    return Promise.reject(data)
  },
  (err) => {
    // If the response status is 401, navigate to the login page
    if (err.response?.status === 401) {
      router.push('/login')
    }
    // Show a notification with an error message, and return a rejected promise
    showNotify({
      type: 'danger',
      message: err.response.data.message || 'Service Error'
    })
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
