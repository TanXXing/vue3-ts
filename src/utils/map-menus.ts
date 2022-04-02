/*
 该函数会将当前登录用户的角色对应的RouteRecordRaw(路由记录)全部取出来,然后，
 在别的地方统一注册当前用户对应的角色相应的component(组件)
*/

let firstMenu: any = null

import type { RouteRecordRaw } from 'vue-router'
export function mapMenusToRoutes(menus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  /*
  1. 先去加载默认所有的routes
  */
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)

  routeFiles.keys().forEach((key) => {
    /*
    ./analysis/dashboard/dashboard.ts
    */
    const route = require('../router/main' + key.slice(1))

    // 往allRoutes中添加/router/main下面所有的路由对象
    allRoutes.push(route.default)
  })

  // 2. 根据菜单获取需要动态注册的路由(route)
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      // 找到了一级菜单，此时,判断它的url是否存在于默认路由
      if (menu.type === 2) {
        const registeringRoute = allRoutes.find(
          (route) => route.path === menu.url
        )
        // 对registeringRoute进行类型缩小的判断
        if (registeringRoute) {
          // 收集需要动态注册的路由记录(RouteRecordRaw)
          routes.push(registeringRoute)
        }

        firstMenu || (firstMenu = menu)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(menus)
  // 返回需要动态注册的路由所在的数组
  return routes
}

export { firstMenu }
