<template>
  <div class="role">
    <page-search :search-form-config="searchFormConfig"></page-search>
    <page-content
      :content-table-config="contentTableConfig"
      pageName="role"
      @handleNewClick="handleNewData"
      @handleEditClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      :otherInfo="otherInfo"
      pageName="role"
    >
      <el-tree
        ref="elTreeRef"
        class="menu-tree"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        @check="handleCheckClick"
      />
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search/index'
import PageContent from '@/components/page-content/index'
import PageModal from '@/components/page-modal/index'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal-config'

import { usePageModal } from '@/hooks/use-page-modal'

import { mapMenusToId } from '@/utils/map-menus'

import { ElTree } from 'element-plus'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallBack = (item: any) => {
      const checkedLeafKeys = mapMenusToId(item.menuList)

      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(checkedLeafKeys)
      })
      console.log(checkedLeafKeys)
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallBack)

    const store = useStore()

    // 从vuex中，获取完整的菜单数据(总结下，为什么有的数据是要使用computed，有的不需要呢)
    const menus = computed(() => store.state.entireMenu)

    // el-tree中的数据配置对象
    const defaultProps = {
      children: 'children',
      label: 'name'
    }

    const otherInfo = ref({})

    const handleCheckClick = (data1: any, data2: any) => {
      const { checkedKeys, halfCheckedKeys } = data2
      const menuList = [...checkedKeys, ...halfCheckedKeys]

      console.log(menuList)

      otherInfo.value = { menuList: menuList }
    }

    return {
      contentTableConfig,
      searchFormConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      defaultProps,
      menus,
      otherInfo,
      handleCheckClick,
      editCallBack,
      mapMenusToId,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 50px;
}
</style>
