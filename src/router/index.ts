import { createRouter, createWebHistory } from 'vue-router'

import type { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'

import { firstMenu } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
    // children: [] // --> 根据userMenus来决定 --> children
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

// 全局前置守卫：当我们没有登录过的时候，是不允许进入首页的，必须先登录

/*
注意上面的顶层路由的出口的重定向指向的是"/mian"(首页)
*/
/* let count = 0 */

router.beforeEach((to) => {
  /* count++
  console.log('执行了多少次呢？' + count)
  console.log('to path' + ' ' + to.path, 'from path' + ' ' + from.path) */
  if (to.path !== '/login') {
    const token = localCache.getCache('token')

    if (!token) {
      return '/login'
    }
  }

  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
