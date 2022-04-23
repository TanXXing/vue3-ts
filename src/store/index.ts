import { createStore, useStore as useVuexStore } from 'vuex'

import type { IStoreType } from './types'
/*
使用ts的好处，就在于它拥有类型检查，那么，如何发挥它的类型检查呢？
正是因为有类型检查，所以，在我们使用函数或者是变量的时候，它会针对性的提示：
正在使用的函数：它的返回值类型，形参类型可以传递哪些值，
正在使用的变量：是对象的话，它的属性有哪些？ 是非对象类型的话，它的值应该是什么类型

上面的那一点在js中，是体会不到的
*/

/*
我现在要收回下面的这句话：
但是，vuex中的这一点做的并不是很好，我们在创建state返回的对象，或者是模块(Modules)中
的state对应的属性时，它的类型检查在使用mutations, getters以及actions中，
不能发挥优势类型检查中，提示的优势(也就是说，不能静态的监测出我输入的有没有这个属性等
 */

/*
但是，在我使用的这个版本中，发现它可以进行类型的自动推导，就说明是没有问题的，

但是，我们仍然自己添加类型的话，还有另外的一个好处，就是，通过定义的类型，就知道它里面
现在有哪些数据，这可以方便我们快速查找它存在哪些数据，以及它们的类型，因此，我们
现在，还是采取，给它明确的类型
 */

/* interface IrootState {
  name: string
  age: number
} */

import type { IRootState } from './types'

import system from './main/system/system'

import login from './login/login'

import dashboard from './main/analysis/dashboard'

import { requestPageListData } from '@/service/main/system/index'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'why',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, payLoad: any) {
      state.entireDepartment = payLoad.departmentList
    },
    changeEntireRole(state, payLoad: any) {
      state.entireRole = payLoad.roleList
    },
    changeEntireMenu(state, payLoad: any) {
      state.entireMenu = payLoad.menuList
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1. 请求所有部门的数据
      const departmentResult = await requestPageListData('/department/list', {
        offset: 0,
        size: 1000
      })

      // 获取list并存储到entireDepartment
      const { list: departmentList } = departmentResult.data

      commit('changeEntireDepartment', {
        departmentList
      })

      // 1. 请求所有角色的数据
      const roleResult = await requestPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      // 获取list并存储到entireRole
      const { list: roleList } = roleResult.data

      commit('changeEntireRole', {
        roleList
      })

      // 3. 请求所有的(完整的)菜单数据
      const menuResult = await requestPageListData('/menu/list', {})

      const { list: menuList } = menuResult.data

      commit('changeEntireMenu', {
        menuList
      })
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore() {
  return useVuexStore<IStoreType>()
}

export default store
