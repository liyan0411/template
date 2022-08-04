<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      // 'permission_routes',
      "sidebar"
    ]),
    permission_routes() {
      return [
        {
          path: "",
          children: [
            {
              path: "home",
              component: "views/dashboard/index",
              name: "Home",
              meta: { title: "首页", icon: "", noCache: true }
            }
          ]
        },
        {
          path: "/qrCode",
          children: [
            {
              path: "manage",
              component: "views/qrCode/manage",
              name: "Home",
              meta: { title: "打赏二维码", icon: "", noCache: true }
            }
          ]
        },
        {
          path: "/money",
          children: [
            {
              path: "report",
              component: "views/money/report",
              name: "FaqsManage",
              meta: { title: "打赏资金报表", icon: "", noCache: true }
            }
          ]
        },
        {
          path: "/agreement",
          children: [
            {
              path: "manage",
              component: "views/agreement/manage",
              name: "FaqsManage",
              meta: { title: "玩家协议管理", icon: "", noCache: true }
            }
          ]
        },
        // {
        //   path: "/error",
        //   name: "ErrorPages",
        //   meta: {
        //     title: "Error Pages",
        //     icon: "el-icon-error"
        //   },
        //   children: [
        //     {
        //       path: "/error/401",
        //       name: "Page401",
        //       meta: { title: "401", noCache: true }
        //     },
        //     {
        //       path: "/error/404",
        //       name: "Page404",
        //       meta: { title: "404", noCache: true }
        //     }
        //   ]
        // }
      ];
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
