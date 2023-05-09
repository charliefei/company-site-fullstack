import { createRouter, createWebHashHistory } from 'vue-router'
import routes from "@/router/config";
import store from '@/store'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/mainbox',
      name: 'mainbox',
      component: () => import('@/views/MainBox.vue')
    }
  ]
})

// 检查每个路由对象是否存在hasAuth属性，存在则判断是否为管理员，不存在直接放行
const checkIsRequiredAuth = (value) => {
  if(value.requiredAuth){
    return store.state.userInfo.role == 1
  }  
  return true
}

const configRoutes = () => {
  if(!router.hasRoute('mainbox')){
    router.addRoute({
      path: '/mainbox',
      name: 'mainbox',
      component: () => import('@/views/MainBox.vue')
    })
  }

  routes.forEach(value => {
    // 对需要进行管理员权限校验的进行拦截检查，不需要的直接添加到mainbox路由下
    checkIsRequiredAuth(value) &&
    router.addRoute('mainbox', value)
  })

  store.commit("changeIsGetRoute", true)
}

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    // 进入login页面直接跳转
    next()
  } else {
    if (!localStorage.getItem('token')) {
      // 未登录情况, 没有获取到token，重定向到login
      next({ path: '/login' })
    } else {
      // 已登录情况，获取到了token
      if (!store.state.isGetRoute) {
        // 删除mainbox下所有已添加的路由
        router.removeRoute('mainbox')
        
        // 第一次进入mainbox，给mainbox配置上子路由，并重新刷新mainbox路由
        configRoutes()
        next({ path: to.fullPath })
      } else {
        // 不是第一次进入mainbox了，直接放行
        next()
      }
    }
  }
})
export default router
