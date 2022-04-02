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
            <el-button typpe="primaty" icon="search">搜索</el-button>
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
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    XXForm
  },
  setup(props) {
    const formDataOrigin: any = {}

    const filedsInFormItems = props.searchFormConfig.formItems ?? []
    // 获取配置文件中的字段
    for (const formItem of filedsInFormItems) {
      formDataOrigin[formItem['field']] = ''
    }

    const formData = ref<any>(formDataOrigin)

    const handleResetClick = () => {
      // 重置数据
      formData.value = {}
      // console.log(formData)

      /* for (const key in formDataOrigin) {
        formData.value[key] = formDataOrigin[key]
      } */

      
    }
    return {
      formData,
      handleResetClick
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
