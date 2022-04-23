<template>
  <div class="page-content">
    <x-x-table
      :data-list="dataList"
      :list-count="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1. table中的表头对应的插槽 -->
      <template #header-handler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="small"
          @click="handleNewClcik"
        >
          新建用户
        </el-button>
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
      <template #handler="scope">
        <el-button
          v-if="isUpdate"
          type="text"
          icon="edit"
          @click="handleEditClick(scope.row)"
          >编辑</el-button
        >
        <el-button
          v-if="isDelete"
          type="text"
          icon="delete"
          @click="deleteBtnClick($event, scope.row)"
          >删除</el-button
        >
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherProps"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <!-- 这里加了个条件渲染 -->
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </x-x-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'

import { useStore } from 'vuex'

import XXTable from '@/base-ui/table/index'

import { usePermissions } from '@/hooks/use-permissions'

export default defineComponent({
  emits: ['handleNewClick', 'handleEditClick'],
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
  setup(props, { emit }) {
    const store = useStore()

    // 0. 获取操作的权限
    const isCreate = usePermissions(props.pageName, 'create')
    const isUpdate = usePermissions(props.pageName, 'update')
    const isDelete = usePermissions(props.pageName, 'delete')
    const isQuery = usePermissions(props.pageName, 'query')

    // 双向绑定pageInfo
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10
    })

    /*
    发送网络请求 (这个地方，为什么，不用写deep: true，个人，觉得是因为，我们执行
    修改的是pageInfo.value = {}一个新的对象，这样的话，即使是浅度侦听，也是
    可以侦听到的，等下去复习下，侦听的时候，什么是默认深度侦听，什么时候是浅度侦听
    ，由于pageInfo是一个响应式对象，因此，这个和vue2中的逻辑就对上了，在
    data中，定一个响应式对象(数组类型的)， 然后，可以通过直接去修改数组名变量
    对应的指针指向的位置，这仍然是在响应式系统里面的，但是，如果，直接向数组中
    通过"数组名[index] = "数据""向数组中，添加数据的话，这个不是响应式的)
    */
    watch(pageInfo, () => {
      getPageData()
    })

    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )

    const dataCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )

    // 将网络请求放在闭包函数中，可以使得多次发起网络请求
    const getPageData = (queryInfo: any = {}) => {
      // 当该用户，没有查询该菜单的权限时，就直接return了
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }

    // 发起网络请求
    getPageData()

    // 获取其它的动态插槽名称
    const otherProps = props.contentTableConfig?.propList.filter(
      (item: any) => {
        switch (item.slotName) {
          case 'status':
            return false
          case 'createAt':
            return false
          case 'updateAt':
            return false
          case 'handler':
            return false

          default:
            return true
        }
      }
    )

    // 删除数据
    const deleteBtnClick = (event: any, info: any) => {
      // console.log(event)
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: info.id
      })
    }

    // 新建数据
    const handleNewClcik = () => {
      emit('handleNewClick')
    }

    // 编辑数据
    const handleEditClick = (item: any) => {
      emit('handleEditClick', item)
    }

    return {
      dataList,
      dataCount,
      getPageData,
      pageInfo,
      otherProps,
      isCreate,
      isUpdate,
      isDelete,
      deleteBtnClick,
      handleNewClcik,
      handleEditClick
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
