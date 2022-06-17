<template>
  <div class="page-search">
    <div class="search">
      <x-x-form v-bind="searchFormConfig" v-model="formData">
        <template #header>
          <h1 class="header">高级检索</h1>
        </template>

        <template #footer>
          <div class="handle-btns">
            <el-button type="primary" icon="refresh" @click="handleResetClick"
              >重置</el-button
            >
            <el-button typpe="primaty" icon="search" @click="handleQueryClick"
              >搜索</el-button
            >
          </div>
        </template>
      </x-x-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import XXForm from '@/base-ui/form/index'

export default defineComponent({
  emits: ['resetBtnClick', 'queryBtnClick'],
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    XXForm
  },
  setup(props, { emit }) {
    const formDataOrigin: any = {}

    const filedsInFormItems = props.searchFormConfig.formItems ?? []

    // 获取配置文件中的字段
    for (const formItem of filedsInFormItems) {
      formDataOrigin[formItem['field']] = ''
    }

    let formData = ref<any>(formDataOrigin)

    const handleResetClick = () => {
      // 发出重置事件
      emit('resetBtnClick')

      for (const key in formDataOrigin) {
        formData.value[key] = formDataOrigin[key]
      }

      // console.log(formData.value)
    }

    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.header {
  color: red;
}

.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
