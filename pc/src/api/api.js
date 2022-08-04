// 引入拦截处理后的 axios
import request from "@/utils/request";
// post 请求
export function post(url, data = {}) {
  return request({
    url,
    method: "post",
    data
  });
}

// get 请求
export function get(url, params = {}) {
  return request({
    url,
    method: "get",
    params
  });
}

// uploadFile 导入文件
export function upload(url, file, data = {}) {
  // 参数为formData 格式
  var fd = new FormData();
  if (data != null && data !== undefined) {
    for (var i = 0; i < data.length; i++) {
      fd.append(data[i].name, data[i].value);
    }
  }
  if (file != null) {
    fd.append("uploadFile", file);
  } else {
    // message
    return;
  }
  return request({
    url,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: fd
  });
}
/**
 * @param {String} url 接口地址
 * @param {String} successName 下载成功或者导出文件成功提示语
 * @param {String} name 文件名字
 * @param {Object} data 接口所需参数
 */
// downloadFile 文件下载
export function download(url, successName, name, data = {}) {
  // 请求前置

  return request({
    url,
    method: "post",
    responseType: "blob",
    data
  })
    .then(r => {
      console.log(r);
    })
    .catch(e => {
      console.log(e);
    });
}
