import type { Module } from 'vuex'
import type { IDashboardState } from './types/index'
import type { IRootState } from '../../types'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/dashboard/index'
const dashboard: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  getters: {},
  mutations: {
    changeCategoryGoodsCount(state, payLoad: any) {
      state.categoryGoodsCount = payLoad.goodsCount
    },
    changeCategoryGoodsSale(state, payLoad: any) {
      state.categoryGoodsSale = payLoad.goodsSale
    },
    changeCategoryGoodsFavor(state, payLoad: any) {
      state.categoryGoodsFavor = payLoad.goodsFavor
    },
    changeAddressGoodsSale(state, payLoad: any) {
      state.addressGoodsSale = payLoad.goodsAddress
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const goodsCountResult = await getCategoryGoodsCount()

      const goodsCount = goodsCountResult.data
      commit('changeCategoryGoodsCount', {
        goodsCount
      })

      const goodsSaleResult = await getCategoryGoodsSale()

      const goodsSale = goodsSaleResult.data

      commit('changeCategoryGoodsSale', {
        goodsSale
      })

      const goodsFavorResult = await getCategoryGoodsFavor()
      const goodsFavor = goodsFavorResult.data

      commit('changeCategoryGoodsFavor', {
        goodsFavor
      })

      const goodsAddressResult = await getAddressGoodsSale()

      const goodsAddress = goodsAddressResult.data

      commit('changeAddressGoodsSale', {
        goodsAddress
      })
    }
  }
}

export default dashboard
