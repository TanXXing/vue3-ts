import { Module } from 'vuex'
import { IRootState } from '@/store/types'

import { ISystemState } from './types'

import {
  requestPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },

    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },

    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },

    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },

    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payLoad) {
      const pageName = payLoad.pageName

      const pageUrl = `/${pageName}/list`

      const pageListResult = await requestPageListData(
        pageUrl,
        payLoad.queryInfo
      )

      const { list, totalCount } = pageListResult.data

      const changePageName =
        pageName.charAt(0).toUpperCase() + pageName.slice(1)

      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },

    async deletePageDataAction({ dispatch }, payLoad: any) {
      const { id, pageName } = payLoad

      const pageUrl = `/${pageName}/${id}`
      // 发起删除数据的请求(发起删除的请求，向服务器，重新请求数据, 请求是异步的，所以要加await)

      await deletePageData(pageUrl)

      // 向服务器重新请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 创建数据
    async createPageDataAction({ dispatch }, payLoad: any) {
      // 在system中的那个界面下创建的什么数据
      const { pageName, newData } = payLoad

      const pageUrl = `/${pageName}`
      // 发起请求

      await createPageData(pageUrl, newData)

      // 重新发起请求，刷新界面的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 编辑数据
    async editPageDataAction({ dispatch }, payLoad: any) {
      // 在哪个界面对哪个用户编辑后的最新数据是什么
      const { pageName, id, editData } = payLoad

      // 拼接请求的url
      const pageUrl = `/${pageName}/${id}`

      // 发起编辑请求
      await editPageData(pageUrl, editData)

      // 重新发起请求，刷新界面的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
