<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          :size="30"
        ></el-avatar>
        <span>coderWhy</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick" icon="CircleClose"
            >退出登录</el-dropdown-item
          >
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import localCache from '@/utils/cache'

import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()

    const handleExitClick = () => {
      /*
      退出登录的逻辑：
      根据之前的登录逻辑，我们可以直接清除本地的token，然后，跳转路由到("/main"),由于没有
      携带token,在router.before()中，会跳转到login登录页面。
      (每次，除了登录页面外，其它页面的请求都是要携带token的，
      这个可以在封装的axios，请求拦截中可以看出来，是从本地中获取的token)
      */
      localCache.deleteCache('token')
      // 跳转页面
      router.push('/main')
    }
    return { handleExitClick }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  align-items: center;
  .el-avatar {
    margin-right: 10px;
  }
}
</style>
