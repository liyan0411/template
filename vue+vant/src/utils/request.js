import axios from 'axios'
import router from '@/router'
import { Notify } from 'vant'
import { getCookie } from '@/utils/utils.js'
import code from '@/config/code'
// create an axios instance   创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API + 'idesk/', // api 的 base_url

  // baseURL: '"http://10.108.26.146:28060/idesk"', // 测试
  // baseURL: '"http://10.108.2.30/idesk"', // uat
  // baseURL: 'https://desk.anji-plus.com/idesk', // 生产
  // baseURL: 'http://10.108.12.20:9998/idesk', // 耿祥本地
  timeout: 80000, // request timeout  设置请求超时时间
  responseType: 'json',
  // withCredentials: true, // 是否允许带cookie这些
  headers: {
    // 'Content-Type': 'application/json;charset=utf-8'
  }
})
let token = getCookie(code.TOKEN)
let username = getCookie(code.USERNAME)
// request interceptor
service.interceptors.request.use(
  config => {
    console.log('config', config)
    // Do something before request is sent
    if (token && username) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['Authorization'] = token
      config.headers['user'] = username
      config.headers['Project'] = getCookie('projectCode')
      config.headers['isLeader'] = getCookie('isLeader')
    }
    return config
  },
  error => {
    // 对请求错误处理
    // Message.warning(error, 2)
    return Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code == 'noLogin' || res.code == '500402') {
      Notify({ type: 'danger', message: "登录失败，请重新进入" })
      // 登录态失效
      // store.dispatch('LogOut').then(res => {
      //   removeUserName()
        router.replace({ path: '/login' })
      // })
    } else if (res.code != '200' && res.code != 0) {
      // 返回流文件的处理  同时存在类型 和大小
      if (res.type && res.size) {
        return Promise.resolve(res)
      }
      Notify({ type: 'danger', message: res.msg })
      return false
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    console.log(error)
    if (error.message.indexOf('timeout') !== -1) {
      // Message.error(timeoutMsg, 2)
      Notify({ type: 'danger', message: '请求超时，请稍后再试！' })
      // return service.request(originalRequest);//例如再重复请求一次
    } else {
      Notify({ type: 'danger', message: error.message })
    }
    return Promise.reject(error)
  }
)
export default service
