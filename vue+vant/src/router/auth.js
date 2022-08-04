import { getQueryString } from '@/utils/utils'
import { get } from '@/api/index'
import config from '@/config'

// 微信自动登录 code=>token
export const getId = to => {
  console.log('to', to)
  var code = to.query.code
  console.log('code', code)
  let url = window.location.href
  let newUrl = url
  let index = url.indexOf('code=')
  if (index == '-1') {
    newUrl = url.substring(0)
  } else {
    newUrl = url.substring(0, index - 1)
  }
  console.log('newUrl', newUrl)
  return
  if (code) {
    // 有 code  自动登录
    get(
      'user/getUserId',
      {
        code
      },
      r => {
        let res = r.repData
        if (r.repCode == '0000') {
          // 用户不存在
          if (res.redirect == '1') {
            alert('请关注相关企业微信后再访问！')
            return
            // code 过期
          } else if (res.redirect == '2') {
            window.location.replace(
              'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
                config.appId +
                '&redirect_uri=' +
                encodeURI(newUrl) +
                '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
            )
          }

          window.location.replace(newUrl)
        }
      },
      e => {
        console.log(e)
        return
      }
    )
    // common.getWxUserInfo();
  } else {
    //无code
    //没有微信用户信息，没有授权-->> 需要授权，跳转授权页面 -->> 自动授权跳转登录

    window.location.replace(
      'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
        config.appId +
        '&redirect_uri=' +
        encodeURI(newUrl) +
        '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
    )
  }
}
