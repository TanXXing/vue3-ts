<template>
  <div class="page-content">
    <x-x-table :data-list="dataList" v-bind="contentTableConfig">
      <!-- 1. table中的表头对应的插槽 -->
      <template #header-handler>
        <el-button type="primary" size="small">新建用户</el-button>
      </template>

      <!-- 2. table中的中间列表对应的插槽 -->
      <template #status="scope">
        <el-button
          :type="scope.row.enable ? 'success' : 'danger'"
          size="small"
          plain
        >
          <span>{{ scope.row.enable ? '启用' : '禁用' }}</span>
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatUtcStr(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatUtcStr(scope.row.updateAt) }}</span>
      </template>
      <template #handle>
        <el-button type="text" icon="edit">编辑</el-button>
        <el-button type="text" icon="delete">删除</el-button>
      </template>
    </x-x-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useStore } from 'vuex'

import XXTable from '@/base-ui/table/index'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  components: {
    XXTable
  },
  setup(props) {
    const store = useStore()

    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    // const userCount = computed(() => store.state.system.userCount)

    store.dispatch('system/getPageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    return {
      dataList
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
