<template>
  <div class="user">
    <page-search
      :search-form-config="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    ></page-search>
    <page-content
      :content-Table-config="contentTableConfig"
      page-name="users"
      ref="pageContentRef"
      @handleNewClick="handleNewData"
      @handleEditClick="handleEditData"
    ></page-content>

    <page-modal
      :modalConfig="modalConfigRef"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      page-name="users"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import PageSearch from '@/components/page-search/index'
import PageContent from '@/components/page-content/index'
import PageModal from '@/components/page-modal/index'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal-config'

import { usePageSearch } from '@/hooks/user-page-search'

import { usePageModal } from '@/hooks/use-page-modal'

import { useStore } from '@/store/index'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    const store = useStore()

    const modalConfigRef = computed(() => {
      // 对modalConfig中的"departmentId"和"roleId"两个字段对应的数据，进行修改
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )

      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })

      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )

      roleItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })

      return modalConfig
    })

    // 创建newCallBack和editCallBack两个回调函数，包含对user.vue组件中的配置的处理

    const newCallBack = () => {
      // 找到modalConfig中的formItes中是password的那一列配置项formItem
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )

      passwordItem!.isHidden = false
    }

    const editCallBack = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )

      passwordItem!.isHidden = true
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallBack, editCallBack)

    return {
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      modalConfigRef,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      newCallBack,
      editCallBack
    }
  }
})
</script>

<style scoped lang="less"></style>
