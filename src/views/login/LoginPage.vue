<script setup>
import { ref, nextTick } from 'vue'
import { userLoginService, userRegisterService } from '@/api/auth'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  email: '',
  password: '',
  repassword: ''
})

const validator = {
  email: (val) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (val === '') return 'Email is required.'
    if (!emailPattern.test(val)) return 'Invalid email format.'
    return true
  },
  password: (val) => {
    if (val === '') return 'Password is required.'
    if (val.length < 6) return 'Password must be at least 6 characters long.'
    if (!/[a-zA-Z]/.test(val))
      return 'Password must contain at least one letter.'
    if (!/[0-9]/.test(val)) return 'Password must contain at least one number.'
    if (!/[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/]/.test(val))
      return 'Password must contain at least one special character.'
    return true
  },
  repassword: (val) => {
    if (val === '') return 'Please confirm your password.'
    if (val !== registerForm.value.password) return 'Passwords do not match.'
    return true
  }
}

const authStore = useAuthStore()
const router = useRouter()
const handleLogin = async () => {
  console.log('登录', loginForm.value)
  const res = await userLoginService(loginForm.value)
  authStore.setToken(res.data.token)
  router.push('/')
}

const active = ref(null)
const passwordField = ref(null)
const handleRegister = async () => {
  const res = await userRegisterService(registerForm.value)
  loginForm.value.email = res.data.email
  active.value = 'login'
  showNotify({
    type: 'success',
    message: res.message
  })

  registerForm.value.email = ''
  registerForm.value.password = ''
  registerForm.value.repassword = ''

  nextTick(() => {
    if (passwordField.value) {
      passwordField.value.focus()
    }
  })
}

const header = ref('Welcome back!')
const registerFormRef = ref(null)
const loginFormRef = ref(null)

const onClickTab = ({ title }) => {
  if (title === 'Sign In') {
    header.value = 'Welcome back!'
    if (loginFormRef.value) {
      loginFormRef.value?.resetValidation()
    }
  } else {
    header.value = 'Hello there!'
    if (registerFormRef.value) {
      registerFormRef.value.resetValidation()
    }
  }
}
</script>

<template>
  <van-nav-bar safe-area-inset-top />
  <div class="login-container">
    <div class="header">
      <img src="/src/assets/images/logo.png" alt="" />
      <h2>{{ header }}</h2>
    </div>
    <van-tabs
      v-model:active="active"
      @click-tab="onClickTab"
      animated
      swipeable
    >
      <van-tab title="Sign In" name="login">
        <van-form ref="loginFormRef" @submit="handleLogin">
          <van-cell-group inset>
            <van-field
              v-model.trim="loginForm.email"
              name="email"
              label="Email"
              placeholder="john.doe@example.com"
              :rules="[{ validator: validator.email }]"
              label-align="top"
              clearable
            />
            <van-field
              ref="passwordField"
              v-model="loginForm.password"
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              :rules="[{ validator: validator.password }]"
              submit-on-enter
              label-align="top"
              clearable
            />
          </van-cell-group>
          <div class="van-submit">
            <van-button round block type="primary" native-type="submit">
              Sign In
            </van-button>
          </div>
          <div class="reset-password">Forgot Password?</div>
        </van-form>
      </van-tab>
      <van-tab title="Sign Up" name="register">
        <van-form ref="registerFormRef" @submit="handleRegister">
          <van-cell-group inset>
            <van-field
              v-model="registerForm.email"
              name="email"
              label="Email"
              placeholder="john.doe@example.com"
              :rules="[{ validator: validator.email }]"
              label-align="top"
              clearable
            />
            <van-field
              v-model="registerForm.password"
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              :rules="[{ validator: validator.password }]"
              submit-on-enter
              label-align="top"
              clearable
            />
            <van-field
              v-model="registerForm.repassword"
              type="password"
              name="repassword"
              label="Re-enter Password"
              placeholder="Re-enter your password"
              :rules="[{ validator: validator.repassword }]"
              submit-on-enter
              label-align="top"
              clearable
            />
          </van-cell-group>
          <div class="van-submit">
            <van-button round block type="primary" native-type="submit">
              Sign Up
            </van-button>
          </div>
        </van-form>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.van-nav-bar {
  opacity: 0;
  height: 0;
}
.login-container {
  background: linear-gradient(#1989fa, #f5f5f5, #f5f5f5);
  width: 375px;
  height: 442px;
  position: relative;
  .header {
    position: absolute;
    top: -325.75px;
    width: 375px;
    height: 387.5px !important;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: 175px;
    background: #fff;
    border-radius: 30px;
    padding-top: 125px;
    padding-bottom: 75px;
    img {
      width: 187.5px;
      height: 131.25px;
      margin-top: 10px;
      object-fit: cover;
    }
    h2 {
      width: 100%;
      margin-top: 10px;
      font-size: 24px;
      text-align: center;
    }
  }
  :deep(.van-tabs) {
    margin-top: 225px;
    .van-tabs__wrap {
      margin: 0 16px;
      margin-bottom: 30px;
      border-radius: 44px;
      .van-tabs__nav {
        background-color: #1989fa;
        .van-tab {
          &.van-tab--active {
            .van-tab__text {
              z-index: 2;
              color: black;
            }
          }
          .van-tab__text {
            z-index: 2;
            color: white;
            transition: color 0.3s;
          }
        }
        .van-tabs__line {
          width: 157.5px;
          height: 32px;
          bottom: auto;
          align-self: center;
          border-radius: 30px;
          background-color: white;
        }
      }
    }
    .reset-password {
      text-align: right;
      margin-right: 16px;
      font-size: 16px;
    }
    .van-tabs__content {
      height: 368px;
    }
  }
  .van-submit {
    margin: 16px;
  }
}
</style>
