import axios from 'axios'
import md5 from 'js-md5'
import { sGetObject } from '@/utils/utils.js'
import { Notify } from 'vant'
// create an axios instance   创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_APIUrl, // api 的 base_url
  timeout: 10000, // request timeout  设置请求超时时间
  responseType: 'json',
  // withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// post请求参数格式化
function requestFormat(reqData) {
  return
}

// get请求参数格式化
function requestGetFormat(reqData) {
  return
}
// request interceptor
service.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = requestFormat(config.data)
    } else {
      config.params = requestGetFormat(config.data)
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
    let res = response.data
    if (response.status === 200) {
      if (response.config.responseType === 'blob') {
        return Promise.resolve(res)
      }

      Notify({ type: 'success', message: res.repMsg })
      // 根据后端响应状态码 处理请求
      switch (res.repCode) {
        case '0000':
          break
        case '0026' || '0023':
          // checkNo();
          break
        // case "0023":
        //   checkNo();
        //   break;
        default:
          Notify({ type: 'danger', message: res.repMsg })
          break
      }
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    console.log(error)
    // Message.destroy()
    // const errMsg = '服务处理异常，请稍后再试！'
    // const timeoutMsg = '请求超时，请稍后再试！'
    //  判断请求超时
    // error.code === 'ECONNABORTED' &&
    if (error.message.indexOf('timeout') !== -1) {
      // Message.error(timeoutMsg, 2)
      return Promise.reject(error)
      // return service.request(originalRequest);//例如再重复请求一次
    }
    if (error.response) {
      // Message.error(errMsg, 2)
      return Promise.reject(error.response)
    }
  }
)
export default service
