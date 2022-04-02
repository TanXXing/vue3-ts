<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!isCollapse" class="title">Vue3+Ts</span>
    </div>

    <el-menu
      class="el-menu-vertical-demo"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      background-color="#0c2135"
      :default-active="activeMenuId"
      :collapse="isCollapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 判断此菜单是一级菜单还是二级菜单，通过获取数据中的type来判断-->
        <template v-if="item.type === 1">
          <!-- 是二级菜单 -->
          <el-sub-menu :index="item.id + ''">
            <!-- 二级菜单可以展开的标题 -->
            <template #title>
              <template v-if="item.icon">
                <i-icon :item-icon="item.icon"></i-icon>
              </template>
              <span>{{ item.name }}</span>
            </template>

            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <template v-if="subitem.icon">
                  <i-icon :item-icon="subitem.icon"></i-icon>
                </template>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 是一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <template v-if="item.icon">
              <i-icon :item-icon="item.icon"></i-icon>
            </template>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import { useStore } from '@/store/index'

import { getIconStr } from '@/utils/index'

import IIcon from '@/base-ui/iicon/iicom.vue'

import { useRouter, useRoute } from 'vue-router'

import { mapPathToMenu } from '@/utils/map-path-to-menu'

import { firstMenu } from '@/utils/map-menus'

export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  components: {
    IIcon
  },
  setup() {
    // vuex
    const store = useStore()

    // vue-router
    const router = useRouter()

    // 获取当前激活的路由
    const route = useRoute()

    // 获取当前的路由记录
    const currentPath = route.path


    const userMenus = computed(() => store.state.login.userMenus)

    // currentPathToMenuId
    const activeMenuId = ref('2')

    const activeMenuItem = mapPathToMenu(userMenus.value, currentPath)

    activeMenuId.value = activeMenuItem
      ? activeMenuItem.id + ''
      : firstMenu.id + ''

    // handle
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url
      })
    }
    return {
      userMenus,
      getIconStr,
      handleMenuItemClick,
      activeMenuId
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }
  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  :deep(.el-submenu__title) {
    background-color: #001529 !important;
  }

  :deep(.el-icon .el-icon-monitor) {
    color: red;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
