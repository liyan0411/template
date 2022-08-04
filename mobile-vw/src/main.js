import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.less'


import { Button } from 'vant';

Vue.use(Button);
// import "./style/theme.less"
Vue.config.productionTip = false
console.log(process.env)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
