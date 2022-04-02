<template>
  <div class="x-x-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :style="itemStyle">
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :show-password="item.type === 'password'"
                  :placeholder="item.placeholder"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref } from 'vue'
import { IFormItem } from '@/base-ui/form/index'

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 30px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // ≥1920px
        lg: 8, // ≥1200px
        md: 12, // ≥992px
        sm: 24, // ≥768px
        xs: 24 // <768px
      })
    }
  },
  setup(props, { emit }) {
    /*
    直接像下面这样写是不行的，是因为，这个代码，只会执行一次，
    因此，当点击按钮之后，下面的这个代码不会再次执行，因此，
    即使，我们在page-search.vue中把fromData.value给置为{}(空对象了)，下面的代码，也
    不会对Form.vue组件中的formData进行更新，因为，在page-search.vue组件
    中，对FormData.value ={}后，在Form.vue组件中得到的modelValue的值为{}，
    这个空的对象，并不能使得Form.vue组件中的formData得到更新

    既然，不能自动更新，那么，可不可以利用computed或者是watch下modelValue的变化
    ，使得在form.vue组件中的formData进行更新呢？就可以达到下面代码再次执行的效果
    const formData = ref({ ...props.modelValue })
    */
    let formData = ref({ ...props.modelValue })

    // 监听modelValue的变化
    /* watch(
      () => props.modelValue,
      (newValue) => {
        formData.value = newValue
        // emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    ) */

    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    )
    return {
      formData
    }
  }
})
</script>

<style scoped lang="less">
.x-x-Form {
  padding-top: 22px;
}
</style>
