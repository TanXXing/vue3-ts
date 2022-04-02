<template>
  <div class="bread-crumb">
    <el-breadcrumb>
      <template v-for="item in breadcrumbData" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import type { IBreadcrumbData } from '@/base-ui/bread-crumb/types'

export default defineComponent({
  props: {
    breadcrumbData: {
      type: Array as PropType<IBreadcrumbData[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
