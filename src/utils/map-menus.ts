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

  /*
  这里的第二个参数如果为true，则不仅包含当前夹main文件夹下的以.ts结尾的文件，还包含
  ，main文件下的子文件夹里面以.ts结尾的文件
  */
  const routeFiles = require.context('../router/main', true, /\.ts$/)

  // console.log('这是获得的routeFiles')

  // console.log(routeFiles)

  // console.log('这是获得的routeFiles.keys()')

  // console.log(routeFiles.keys())

  routeFiles.keys().forEach((key) => {
    /*
    ./analysis/dashboard/dashboard.ts
    */

    // 这个不就是导入对象的操作吗？common js的导入方式
    const route = require('../router/main' + key.slice(1))

    // 往allRoutes中添加/router/main下面所有的路由对象
    allRoutes.push(route.default)

    // console.log('这是allRoutes')

    // console.log(allRoutes)
  })

  // 2. 根据菜单获取需要动态注册的路由(route)
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      // 找到了一级菜单，此时,判断它的url是否存在于默认路由(这里百度后，一级菜单和二级菜单，和这里写的是反的)
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

// 根据菜单获取所有的按钮权限
const mapMenuToPermission = (userMenus: any[]) => {
  const userPermissions: string[] = []

  const _getUserPermission = (menu: any) => {
    for (const item of menu) {
      if (item.type === 1 || item.type === 2) {
        _getUserPermission(item.children ?? [])
      } else if (item.type === 3) {
        userPermissions.push(item.permission)
      }
    }
  }

  _getUserPermission(userMenus)

  // 返回该用户所拥有的所有权限的数组
  return userPermissions
}

// 将roleList中的menusList中的叶子节点,映射为包含其中id的数组
export function mapMenusToId(menus: any[]) {
  const checkedLeafKeys: number[] = []

  const _getCheckedKey = (menus: any) => {
    for (const menu of menus) {
      if (menu.children) {
        _getCheckedKey(menu.children)
      } else {
        // 收集叶子节点的id
        checkedLeafKeys.push(menu.id)
      }
    }
  }
  _getCheckedKey(menus)

  return checkedLeafKeys
}

export { firstMenu, mapMenuToPermission }
