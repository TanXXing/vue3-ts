<template>
  <div class="echart">
    <div ref="echartRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'

import type { EChartsOption } from 'echarts'

import { useEchart } from '../index'

const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEchart(echartRef.value!)

  /*
  这里使用watchEffect，来监听props.options的变化，
  因为，在刚进入base-chart.vue组建中时，会调用setOptions(props.options)
 ,当pie-echart.vue组件中，传递过来的computedRef对象options发生变化时，会再次
 执行setOptions(props.options)
  */
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
