import { localCache } from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

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
    // children: 根据接口返回的userMenus动态设置
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes: routes,
  history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      next('/login')
      return
    }

    console.log('beforeEach,to:', to)
  }

  // 处理main的动态子路由
  if (to.path.startsWith('/main')) {
    // 确保用户菜单已经加载
    const userMenus = localCache.getCache('userMenus')
    if (userMenus) {
      const routes = mapMenusToRoutes(userMenus)
      let routeAdded = false

      console.log(
        '当前已注册的路由:',
        router.getRoutes().map((r) => ({ path: r.path, name: r.name }))
      )
      console.log(
        '需要注册的动态路由:',
        routes.map((r) => ({ path: r.path, name: r.name }))
      )

      // 确保所有路由都已注册
      routes.forEach((route) => {
        const existingRoute = router
          .getRoutes()
          .find((r) => r.path === route.path)
        if (!existingRoute) {
          console.log('添加路由:', route.path)
          router.addRoute('main', route)
          routeAdded = true
        }
      })

      console.log(
        '添加路由后的路由列表:',
        router.getRoutes().map((r) => ({ path: r.path, name: r.name }))
      )

      // 如果添加了新路由，需要重新导航，确保路由能够正确匹配
      if (routeAdded) {
        console.log('重新导航到:', to.path)
        next({ ...to, replace: true })
        return
      }

      // 登录后停留在/main页面，不自动跳转到第一个子路由
      // if (to.path === '/main' && routes.length > 0) {
      //   console.log('跳转到第一个子路由:', routes[0].path)
      //   next({ path: routes[0].path, replace: true })
      //   return
      // }
    }
  }

  console.log('继续导航到:', to.path)
  next()
})

export default router
