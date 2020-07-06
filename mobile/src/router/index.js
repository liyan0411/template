import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue"),
    children: [
      {
        path: "/index",
        name: "index",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/views/tabBar/index.vue")
      },
      {
        path: "/lists",
        name: "lists",
        component: () =>
          import(/* webpackChunkName: "list" */ "@/views/tabBar/list.vue")
      }
    ]
  },
  {
    path: "/listDetail",
    name: "listDetail",
    component: () =>
      import(
        /* webpackChunkName: "listDetail" */ "@/views/tabBar/listDetail.vue"
      )
  }
];

const router = new VueRouter({
  routes
});

export default router;
