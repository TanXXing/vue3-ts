<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="activeName">
      <el-tab-pane class="tab-pane" name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><avatar /></el-icon>
            <span class="account">账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane class="tab-pane" name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><cellphone /></el-icon>
            <span class="phone">手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link href="http://wwww.baidu.com/" target="_blank">忘记密码</el-link>
    </div>
    <div class="immediate-login">
      <el-button type="primary" class="login-btn" @click="handleLoginBtn"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-accoount.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(true)

    const activeName = ref('account')

    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()

    const handleLoginBtn = () => {
      if (activeName.value === 'account') {
        // 调用login-account中这个组件中的loginAction方法，在login-account组件中进行正式的验证
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        // 调用login-phone中这个组件的loginAction方法
        console.log('调用login-phone中这个组件的loginAction方法')
      }
    }
    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      handleLoginBtn,
      activeName
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-top: -200px;
  width: 320px;
  .title {
    text-align: center;
  }
  .demo-tabs {
    .custom-tabs-label {
      .account,
      .phone {
        margin-left: 2px;
        color: red;
      }
    }
  }
  .account-control {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }

  .immediate-login {
    margin-top: 5px;
    .login-btn {
      width: 100%;
    }
  }
}

.custom-tabs-label {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
