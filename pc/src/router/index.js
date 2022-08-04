import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/* Router Modules */

/**
 * Note: 子菜单只在路径子时出现。长度> = 1
 *
 * hidden: true                   是否隐藏菜单栏显示该路由
 * alwaysShow: true               是否始终显示根菜单
 *                                如果没有设置alwaysShow，当项目有多个子路径时，
 *                                它将变成嵌套模式，否则不会显示根菜单
 * redirect: noRedirect           如果设置了noRedirect将不会在面包屑中重定向
 * name:'router-name'             该名称由<keep-alive>缓存时使用(必须设置!!)
 * meta : {
    roles: ['XXX1','XXX2']    控制页面角色(您可以设置多个角色)，type:Array
    title: 'XXX'               在侧边栏和面包屑中显示的名称(推荐设置)
    icon: 'XXX' 图标显示在侧边栏中
    noCache: true                如果设置为真，页面将不会被缓存
    affix: true                  如果设置为真，标签将附着在标签视图中
    breadcrumb: false            如果设置为false，项目将隐藏在面包屑中
    activeMenu: '/XXX'  如果设置路径，侧边栏将突出显示您设置的路径
  }

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/auth-redirect"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401"),
    hidden: true,
  },
  {
    path: "/home",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/",
        component: () => import("@/views/home/index"),
        name: "Home",
        meta: {
          title: "首页",
          icon: "el-icon-s-home",
          noCache: true,
        },
      },
    ],
  },
  {
    path: "/qrCode",
    component: Layout,
    redirect: "/qrCode/manage",
    children: [
      {
        path: "manage",
        component: () => import("@/views/qrCode/manage"),
        name: "QrCodeManage",
        meta: {
          title: "打赏二维码管理",
          icon: "el-icon-s-home",
          noCache: true,
        },
      },
    ],
  },
  {
    path: "/money",
    component: Layout,
    redirect: "/money/report",
    children: [
      {
        path: "report",
        component: () => import("@/views/money/report"),
        name: "MoneyReport",
        meta: {
          title: "打赏资金报表",
          icon: "el-icon-s-home",
          noCache: true,
        },
      },
    ],
  },
  {
    path: "/agreement",
    component: Layout,
    redirect: "/agreement/manage",
    children: [
      {
        path: "manage",
        component: () => import("@/views/agreement/manage"),
        name: "AgreementManage",
        meta: {
          title: "玩家协议管理",
          icon: "el-icon-s-home",
          noCache: true,
        },
      },
    ],
  },
  {
    path: "/error",
    component: Layout,
    redirect: "noRedirect",
    name: "ErrorPages",
    meta: {
      title: "Error Pages",
      icon: "404",
    },
    children: [
      {
        path: "401",
        component: () => import("@/views/error-page/401"),
        name: "Page401",
        meta: { title: "401", noCache: true },
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404"),
        name: "Page404",
        meta: { title: "404", noCache: true },
      },
    ],
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: "/error",
    component: Layout,
    redirect: "noRedirect",
    name: "ErrorPages",
    meta: {
      title: "Error Pages",
      icon: "404"
    },
    children: [
      {
        path: "401",
        component: () => import("@/views/error-page/401"),
        name: "Page401",
        meta: { title: "401", noCache: true }
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404"),
        name: "Page404",
        meta: { title: "404", noCache: true }
      }
    ]
  }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
