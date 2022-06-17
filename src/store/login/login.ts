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
import user from '@/router/main/system/user/user'

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

      // console.log(dynamicRegisterRoutes)

      // 注册动态路由(仅仅是注册动态路由, 并没有实现路由的跳转)
      for (const route of dynamicRegisterRoutes) {
        router.addRoute('main', route)
      }

      /*
      这个按钮的权限，不知道有什么用，但是，一注释之后，会发现某些东西在界面没有展示了，
      它是在userMenu中的每一项中的type等于3的时候，可以拿到的数据
      */
      // 获取某个用户所有的权限
      const userPermissions = mapMenuToPermission(state.userMenus)

      // console.log(userPermissions)
      state.userPermissions = userPermissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1. 实现登录逻辑
      const loginResult = await accountLoginRequest(payload)

      const { id, token } = loginResult.data

      console.log(id)

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

      console.log(userInfo.role.id)

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
      const token = localCache.getCache('token')

      if (token) {
        commit('changeToken', token)
        /*
        防止刷新浏览器之后，vuex中的department和role的数据丢失,
        之前把下面的这个获取getInitialDataAction的数据放到了loadLocalLogin的最前面，
        此时，如果，我手动删除了token，或者token存在一个过期时间的话，
        此时，当我们再刷新浏览器是，或者是访问资源时，会由于，我在loadLocalLogin
        的最前面写了dispatch('getInitialDataAction', null, { root: true }),导致
        ，会发起请求，但是，此时，并没有携带token，当然，本质，还是，在main.js，也就是
        整个程序的入口(执行js代码)，那里为了防止，在我们已经登录了，但是，此时，刷新浏览器
        之后，此时，在vuex中的数据会丢失，因此，我们在登录的时候，把数据存到本地的localStorage,
        ，当浏览器被刷新之后，即使此时的vuex的数据丢失了，但是，此时，我们可以利用setupStore函数的
        作用，在应用程序重新执行的期间，将本地缓存中的数据，添加到vuex中(“后半部分说的可能有误”)
        */
        dispatch('getInitialDataAction', null, { root: true })
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
