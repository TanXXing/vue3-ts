<template>
  <div class="nav-header">
    <div class="header-left">
      <el-icon @click="switchIconCpn" class="fold-expand-menu">
        <component :is="iconCpnName"></component>
      </el-icon>
    </div>
    <div class="header-content">
      <x-x-breadcrumb :breadcrumb-data="breadcrumbData"></x-x-breadcrumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import XXBreadcrumb from '@/base-ui/bread-crumb/index'

import UserInfo from './user-info.vue'

import { mapPathBreadcrumb } from '@/utils/map-path-to-menu'

import { useStore } from '@/store/index'

import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    UserInfo,
    XXBreadcrumb
  },
  emits: ['changeFold'],
  setup(props, { emit }) {
    let isFold = ref(false)
    let iconCpnName = ref('expand')

    const switchIconCpn = () => {
      isFold.value = !isFold.value
      iconCpnName.value = isFold.value ? 'fold' : 'expand'
      emit('changeFold', isFold.value)
    }

    // 面包屑的数据(通过computed让其成为响应式的数据)
    const store = useStore()

    const userMenus = store.state.login.userMenus

    const currentRoute = useRoute()

    const breadcrumbData = computed(() => {
      return mapPathBreadcrumb(userMenus, currentRoute.path)
    })

    return {
      isFold,
      iconCpnName,
      switchIconCpn,
      breadcrumbData
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .header-content {
    display: flex;
    flex: 1;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
  }
}
.fold-expand-menu {
  font-size: 30px;
  cursor: pointer;
}
</style>
