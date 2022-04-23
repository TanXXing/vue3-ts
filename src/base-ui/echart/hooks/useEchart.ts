import * as echarts from 'echarts'

import { EChartsOption } from 'echarts'

import ChinaMapData from '../data/china.json'

echarts.registerMap('china', ChinaMapData)

export function useEchart(el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOptions = (options: EChartsOption) => {
    echartInstance.setOption(options)
  }

  // 向外暴漏一个函数，来改变base-chart中的图表的变化
  const updateSize = () => {
    echartInstance.resize()
  }

  // 监听浏览器的窗口事件
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
