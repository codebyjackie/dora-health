<script setup>
import { ref } from 'vue'

const active = ref(null)
</script>

<template>
  <RouterView />
  <van-tabbar v-model="active">
    <van-tabbar-item replace to="/home" icon="home-o">Home</van-tabbar-item>
    <van-tabbar-item replace to="/profile" icon="setting-o"
      >Profile</van-tabbar-item
    >
  </van-tabbar>
</template>

<style lang="scss">
.page-container {
  padding: 30px 15px;
}
h3 {
  margin: 5px 0;
}
</style>
