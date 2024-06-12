<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'

const show = ref(false)
const actions = [
  { name: 'Change avatar' },
  { name: 'Change nickname' },
  { name: 'Change gender' }
]

const router = useRouter()
const authStore = useAuthStore()

const signOut = () => {
  authStore.setToken('') // 清除 token
  router.push('/login') // 重定向到登录页面
}
</script>

<template>
  <div class="page-container">
    <div class="title-container" @click="show = true">
      <div class="left">
        <img class="avatar" src="@/assets/images/default.png" alt="" />
        <img class="gender" src="@/assets/images/male.png" alt="" />
      </div>
      <div class="right">
        <h3>example@example.com</h3>
        <p>exa****com</p>
      </div>
    </div>
    <van-cell-group inset>
      <van-cell title="Route" is-link to="index" />
      <van-cell
        icon="setting-o"
        title="Edit Profile"
        is-link
        to="edit-user-info"
      />
      <van-cell icon="info-o" title="About" is-link to="about" />
    </van-cell-group>

    <van-cell-group inset>
      <van-cell title="Sign Out" @click="signOut" />
    </van-cell-group>
  </div>
  <van-action-sheet
    v-model:show="show"
    :actions="actions"
    cancel-text="Cancel"
    @select="onSelect"
  />
</template>

<style lang="scss" scoped>
.title-container {
  display: flex;
  margin-bottom: 10px;
  .left {
    position: relative;
    border: 5px solid white;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    .avatar {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    .gender {
      position: absolute;
      left: 50px;
      height: 30px;
      width: 30px;
      background-color: #fff;
      border-radius: 50%;
      padding: 5px;
    }
  }
  .right {
    flex: 1;
    padding: 15px 20px;
  }
}
:deep(.van-cell-group--inset) {
  margin: 0;
  border-radius: 10px;
  margin-bottom: 10px;
  .van-cell {
    .van-cell__title {
      span {
        margin-left: 5px;
        vertical-align: middle;
      }
    }
  }
}
:deep(.van-button) {
  margin-top: 20px;
  border-radius: 10px;
  background-color: #f5f5f5;
  span {
    color: #616161;
  }
}
</style>
