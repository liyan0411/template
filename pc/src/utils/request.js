import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";
import config from "@/config";

import { sGetObject } from "@/utils/utils";
// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV == "development" ? config.baseURL : "", // api 的 base_url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});
// post请求参数格式化
function requestFormat(reqData) {
  let data = {
    data: {
      ...reqData
    },
    userId: sGetObject("user")?sGetObject("user").id:""
  };
  return data;
}

// get请求参数格式化
function requestGetFormat(reqData) {
  return;
}
// request interceptor
service.interceptors.request.use(
  config => {
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
      // 根据后端响应状态码 处理请求

      switch (res.code) {
        case "200":
          break;
        default:
          // if (!res.success) {
          //   Message({
          //     message: res.code,
          //     type: "error",
          //     duration: 5 * 1000
          //   });
          // }
          break;
      }
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
  error => {
    console.log(error);
    Message.destroy()
    const errMsg = '服务处理异常，请稍后再试！'
    const timeoutMsg = '请求超时，请稍后再试！'
    //  判断请求超时
    // error.code === 'ECONNABORTED' &&
    if (error.message.indexOf("timeout") !== -1) {
      Message.error(timeoutMsg, 2)
      return Promise.reject(error);
      // return service.request(originalRequest);//例如再重复请求一次
    }
    if (error.response) {
      Message.error(errMsg, 2)
      return Promise.reject(error.response);
    }
  }
);

export default service;
