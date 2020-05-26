import axios from "axios";
import defaultSettings from "@/config";
import md5 from "js-md5";
import { sGetObject } from "@/utils/utils.js";
import { Notify } from "vant";
// create an axios instance   创建axios实例
const service = axios.create({
  baseURL: defaultSettings.baseURL, // api 的 base_url
  timeout: 10000, // request timeout  设置请求超时时间
  responseType: "json",
  // withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});
function setUrl(url) {
  let base = defaultSettings.rootb;
  if (url.indexOf("authority") !== -1) {
    base = defaultSettings.roota;
  }
  return base + url;
}
// 设置公共请求参数
function setReqData(p) {
  let user = sGetObject("_user");
  let token = sGetObject("_token");
  // 获取时间戳 到秒
  let time = parseInt(new Date().getTime() / 1000);
  let sign = "";

  // 生成sign
  let s = {
    reqData: JSON.stringify(p),
    time,
    token: token || ""
  };

  // 排序key
  var keyArr = [];
  for (var item in s) {
    keyArr.push(item);
  }
  keyArr.sort();

  // 生成加密
  for (var i = 0; i < keyArr.length; i++) {
    var key = keyArr[i];
    var value = s[key];
    sign += `${key}=${value}${i < keyArr.length - 1 ? "&" : ""}`;
  }

  let commonReq = {
    userId: user ? user.id : "",
    token: token || "",
    time,
    sign: md5(sign).toUpperCase()
  };
  return commonReq;
}

// post请求参数格式化
function requestFormat(reqData) {
  let common = setReqData(reqData);
  let req = {
    reqData: reqData,
    sign: common.sign,
    time: common.time,
    token: common.token,
    userId: common.userId
  };
  return req;
}

// get请求参数格式化
function requestGetFormat(reqData) {
  let _user = null;
  let userId;
  if (_user) {
    userId = _user.id;
  }
  reqData.userId = userId;
  let req = reqData;
  return req;
}
// request interceptor
service.interceptors.request.use(
  config => {
    config.url = setUrl(config.url);
    if (config.method === "post") {
      config.data = requestFormat(config.data);
    } else {
      config.params = requestGetFormat(config.data);
    }
    return config;
  },
  error => {
    // 对请求错误处理
    // Message.warning(error, 2)
    return Promise.reject(error);
  }
);
// response interceptor
service.interceptors.response.use(
  response => {
    let res = response.data;
    if (response.status === 200) {
      if (response.config.responseType === "blob") {
        return Promise.resolve(res);
      }

      Notify({ type: "success", message: res.repMsg });
      // 根据后端响应状态码 处理请求
      switch (res.repCode) {
        case "0000":
          break;
        case "0026" || "0023":
          // checkNo();
          break;
        // case "0023":
        //   checkNo();
        //   break;
        default:
          Notify({ type: "danger", message: res.repMsg });
          break;
      }
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
  error => {
    console.log(error);
    // Message.destroy()
    // const errMsg = '服务处理异常，请稍后再试！'
    // const timeoutMsg = '请求超时，请稍后再试！'
    //  判断请求超时
    // error.code === 'ECONNABORTED' &&
    if (error.message.indexOf("timeout") !== -1) {
      // Message.error(timeoutMsg, 2)
      return Promise.reject(error);
      // return service.request(originalRequest);//例如再重复请求一次
    }
    if (error.response) {
      // Message.error(errMsg, 2)
      return Promise.reject(error.response);
    }
  }
);
export default service;
