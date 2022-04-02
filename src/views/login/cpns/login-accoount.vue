<template>
  <div class="login-account">
    <el-form
      label-position="right"
      :rules="rules"
      :model="account"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'

import { rules } from '../config/account-config'

import localCache from '@/utils/cache'
import type { ElForm } from 'element-plus'

export default defineComponent({
  setup() {
    // 拿到store对象
    const store = useStore()

    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((isValid) => {
        // 1. 判断，是否需要记录密码

        if (isValid) {
          // 本地缓存
          if (isKeepPassword) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            // 当记住密码的勾去掉后，我们再次点击“立即登录”之后，希望达到的效果是，自动清除缓存
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
        }

        // 2. 开始登录验证
        store.dispatch('login/accountLoginAction', { ...account })
      })
    }
    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
