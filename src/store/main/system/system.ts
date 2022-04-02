import { Module } from 'vuex'
import { IRootState } from '@/store/types'

import { ISystemState } from './types'

import { requestPageListData } from '@/service/main/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        // return state[`${pageName}List`]
        switch (pageName) {
          case 'users':
            return state.usersList

          case 'role':
            return state.roleList
        }
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
    }
  },
  actions: {
    async getPageListAction({ commit }, payLoad) {
      /*  console.log(payLoad.pageUrl)
      console.log(payLoad.queryInfo) */

      const pageName = payLoad.pageName

      const pageUrl = `/${pageName}/list`

      /* switch (pageName) {
        case 'users':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
      }
 */
      const pageListResult = await requestPageListData(
        pageUrl,
        payLoad.queryInfo
      )

      const { list, totalCount } = pageListResult.data

      const changePageName =
        pageName.charAt(0).toUpperCase() + pageName.slice(1)

      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
      /* switch (pageName) {
        case 'users':
          commit('changeUsersList', list)
          commit('changeUsersCount', totalCount)
          break
        case 'role':
          commit('changeRoleList', list)
          commit('changeRoleCount', totalCount)
      } */
    }
  }
}

export default systemModule
