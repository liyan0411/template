import Vue from "vue";
import { Button, Tabbar, TabbarItem } from "vant";
import "vant/lib/index.less";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@babel/polyfill";
import qa from "./api";

Vue.prototype.qa = qa;
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
