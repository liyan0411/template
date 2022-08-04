/**
 * @name 常用工具库封装
 */
import Cookies from 'js-cookie'

export function setCookie(key, value) {
  return Cookies.set(key, value)
}
export function removeCookie(key) {
  return Cookies.remove(key)
}
export function getCookie(key) {
  return Cookies.get(key)
}
// export function getCookie(cname) {
//   if (document.cookie.length > 0) {
//     let cstart = document.cookie.indexOf(cname + '=')
//     if (cstart != -1) {
//       cstart = cstart + cname.length + 1
//       let cend = document.cookie.indexOf(';', cstart)
//       if (cend == -1) cend = document.cookie.length
//       return unescape(document.cookie.substring(cstart, cend))
//     }
//   }
//   return ''
// }

export const sGet = k => {
  try {
    var v = sessionStorage.getItem(k)
    return v == null ? null : JSON.parse(v)
  } catch (e) {
    console.log('sGet', e)
  }
}

export const sSet = (k, v) => {
  try {
    sessionStorage.setItem(k, JSON.stringify(v))
  } catch (e) {
    console.log('sSet', e)
  }
}
export const lGet = k => {
  try {
    var v = localStorage.getItem(k)
    return v == null ? null : JSON.parse(v)
  } catch (e) {
    console.log('lGet', e)
  }
}

export const lSet = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v))
  } catch (e) {
    console.log('lSet', e)
  }
}
/**
 * @name 获取url后拼接的参数
 * @param 参数名
 * @return 参数名对应的值
 */
export const getQueryString = name => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
/**
 * @name:微信浏览器关闭当前浏览器窗口
 */
export const closeWin = () => {
  //关闭安卓系统
  document.addEventListener(
    'WeixinJSBridgeReady',
    function() {
      WeixinJSBridge.call('closeWindow')
    },
    false
  )
  //关闭ios系统
  WeixinJSBridge.call('closeWindow')
}
