import { IBreadcrumbData } from '@/base-ui/bread-crumb/index'

export function mapPathBreadcrumb(userMenus: any[], currentPath: string) {
  const breadcrumbData: IBreadcrumbData[] = []
  mapPathToMenu(userMenus, currentPath, breadcrumbData)

  // 将这个引用值给传递回去
  return breadcrumbData
}

export function mapPathToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbData?: IBreadcrumbData[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = mapPathToMenu(menu.children ?? [], currentPath)
      /*
      这个地方需要对findMenu进行判断之后，再return，
      如果写成下面这样：
      return findMenu
      就会出现问题: 这个问题和return直接返回函数有关，这个可以思考下
      */
      if (findMenu) {
        breadcrumbData?.push({ name: menu.name })
        breadcrumbData?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && currentPath === menu.url) {
      return menu
    }
  }
}
