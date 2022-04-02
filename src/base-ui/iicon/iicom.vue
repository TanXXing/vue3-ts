<template>
  <el-icon>
    <component :is="getIconStr(itemIcon, 8)"></component>
  </el-icon>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getIconStr } from '@/utils/index'

export default defineComponent({
  props: {
    itemIcon: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {
      getIconStr
    }
  }
})
</script>

<style scoped></style>
