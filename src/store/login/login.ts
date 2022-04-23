import localCache from '@/utils/cache'

import type { Module } from 'vuex'
import router from '@/router'

import type { ILoginState } from './types'

import type { IRootState } from '../types'

import type { IAccount } from '@/service/login/types'

import { mapMenusToRoutes } from '@/utils/index'

import { mapMenuToPermission } from '@/utils/map-menus'

import {
  accountLoginRequest,
  userInfoRequestById,
  userMenusRequestByRoleId
} from '@/service/login/login'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      userPermissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // userMenus => routes:
      //add
      // 将routes(提前写好的path --> component) ======> router.main.children
      const dynamicRegisterRoutes = mapMenusToRoutes(userMenus)

      // const router = useRouter()

      // 注册动态路由(仅仅是注册动态路由, 并没有实现路由的跳转)
      for (const route of dynamicRegisterRoutes) {
        router.addRoute('main', route)
      }

      // 获取某个用户所有的权限
      const userPermissions = mapMenuToPermission(state.userMenus)

      state.userPermissions = userPermissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1. 实现登录逻辑
      const loginResult = await accountLoginRequest(payload)

      const { id, token } = loginResult.data

      // 将获取的token缓存到本地
      localCache.setCache('token', token)

      commit('changeToken', token)

      // 2. 请求用户信息
      const userInfoResult = await userInfoRequestById(id)
      // console.log(userInfoResult)

      const userInfo = userInfoResult.data

      // 缓存用户信息(保存到vuex以及localStorage中)
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3. 请求用户菜单
      const userMenusResult = await userMenusRequestByRoleId(userInfo.role.id)

      // console.log(userMenusResult)

      const userMenus = userMenusResult.data

      // 缓存userMenus的数据(利用vuex和localStorage)
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4. 跳转到首页
      router.push('/main')

      // 5. 登录后，保证获取到token之后，再获取department和role的数据
      dispatch('getInitialDataAction', null, { root: true })
    },

    loadLocalLogin({ commit, dispatch }) {
      // 防止刷新浏览器之后，vuex中的department和role的数据丢失
      dispatch('getInitialDataAction', null, { root: true })

      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
