import './assets/main.scss'

import App from './App.vue'
import { createApp } from 'vue'

import router from './router'

import pinia from '@/stores/index'

// Use the 'en-US' locale from the 'vant' library
import { Locale } from 'vant'
import enUS from 'vant/es/locale/lang/en-US'
Locale.use('en-US', enUS)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
