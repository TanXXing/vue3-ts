<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <x-x-card title="分类商品数量(饼图)">
          <pie-echart :pieData="pieData"></pie-echart>
        </x-x-card>
      </el-col>
      <el-col :span="10">
        <x-x-card title="不同城市商品销量"></x-x-card>
      </el-col>
      <el-col :span="7">
        <x-x-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="pieData"></rose-echart>
        </x-x-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <x-x-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSaleData"></line-echart>
        </x-x-card>
      </el-col>
      <el-col :span="12">
        <x-x-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavorData"></bar-echart>
        </x-x-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import XXCard from '@/base-ui/card/index'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart
} from '@/components/page-echarts/index'

export default defineComponent({
  name: 'dashboard',
  components: {
    XXCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    // 从vuex中获取categoryGoodsCount的数据
    const pieData = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    // 从vuex中获取categoryGoodsSale
    const categoryGoodsSaleData = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []

      const categoryGoodsSaleResult = store.state.dashboard.categoryGoodsSale

      for (const item of categoryGoodsSaleResult) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return {
        xLabels,
        values
      }
    })

    // 从vuex中获取categoryGoodsFavor
    const categoryGoodsFavorData = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []

      const categoryGoodsFavorResult = store.state.dashboard.categoryGoodsFavor

      for (const item of categoryGoodsFavorResult) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return {
        xLabels,
        values
      }
    })
    return {
      pieData,
      categoryGoodsSaleData,
      categoryGoodsFavorData
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 20px;
}
</style>
