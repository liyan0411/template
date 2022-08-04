// 引入拦截处理后的 axios
import request from '@/utils/request'

import { Notify } from 'vant'
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

// uploadFile 导入文件
export function upload(url, fileKey = 'uploadFile', file, data = {}) {
  // 参数为formData 格式
  var fd = new FormData()
  if (data != null && data !== undefined) {
    for (var i = 0; i < data.length; i++) {
      fd.append(data[i].name, data[i].value)
    }
  }
  if (file != null) {
    fd.append(fileKey, file)
  } else {
    Notify({ type: 'danger', message: '请选择文件！' })
    return
  }
  return request({
    url,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: fd
  })
}
