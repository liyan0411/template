// 引入拦截处理后的 axios
import request from './request'

// post 请求
export function post(url, data = {}) {
  return request({
    url,
    method: 'post',
    data
  })
}

// get 请求
export function get(url, params = {}) {
  return request({
    url,
    method: 'get',
    params
  })
}
