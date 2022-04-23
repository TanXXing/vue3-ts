<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="Warning"
      width="30%"
      center
      destroy-on-close
    >
      <x-x-form v-bind="modalConfig" v-model="formData"></x-x-form>
      <!-- 建议在页面的模块划分中，或者是个元素添加样式时，不要直接使用地方库来划分页面，
      并且进行样式的修改，而是采取给其包裹一个元素 -->
      <div class="menu-tree">
        <slot></slot>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'

import XXForm from '@/base-ui/form/index'

export default defineComponent({
  components: {
    XXForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    let dialogVisible = ref(false)

    const formData = ref<any>({})

    // 侦听defaultFormData的改变，并修改，formData的值
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    const store = useStore()

    // 处理confirm的逻辑
    const handleConfirmClick = () => {
      // 关闭dialog(对话框)
      dialogVisible.value = false

      // 此处由于是在同一个user界面中，使用了两个对话框，因此，需要判断此时是编辑用户还是新建用户
      if (Object.keys(props.defaultInfo).length) {
        // 是编辑用户的数据
        // console.log('编辑用户')

        // 用户在dialog中输入的最新数据从formData(当前界面的响应式对象)中，可以获取到
        // console.log(formData)

        //通过用户点击编辑按钮时，传递过来的defaultInfo来获取被点击用户的Id
        // console.log(props.defaultInfo)

        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // console.log('新建用户')
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
