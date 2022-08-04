import Vue from 'vue'
import VueRouter from 'vue-router'
import { getCookie, getQueryString } from '@/utils/utils'
import code from "@/config/code"
import { getId } from './auth'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    meta: {
      requireAuth: true,
      title: '首页'
    },
    component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404'
    },
    component: () => import(/* webpackChunkName: "error404" */ '@/views/errorPage/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 判断是否需要登录权限
  if (to.matched.some(res => res.meta.requireAuth)) {
    // 判断是否已经登录
    var token = getCookie(code.TOKEN)
    console.log('token', token)
    if (token) {
      next()
    } else {
      console.log('code', to.query.code)
      // 未登录判断访问来源；是企业应用内部访问 还是浏览器打开
      if (to.query.code) {
        getId(to)
      } else {
        next(`/login?redirect=${to.fullPath}`)
      }
    }
  } else {
    next()
  }
})

export default router
