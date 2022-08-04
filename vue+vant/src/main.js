import Vue from 'vue'
import { Button, Field } from 'vant'
import 'vant/lib/index.less'
import 'lib-flexible/flexible.js'

import router from './router'
import App from './App.vue'
import store from './store'
import * as request from "./api"
// import "./style/theme.less"
Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.use(Button);
Vue.use(Field)
console.log(process.env)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
