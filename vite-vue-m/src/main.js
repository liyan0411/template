import { createApp } from 'vue'
import store from './store/index'
import router from './router/index'
import 'lib-flexible'
import App from './App.vue'
import request from "@/utils/request"

import { Button, Icon } from "@nutui/nutui";

console.log(import.meta.env)
const app=createApp(App)
// 挂摘全局对象
app.config.globalProperties.$request = request;

app.use(Button).use(router).use(store).mount('#app')
