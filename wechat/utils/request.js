const config = require('../config/index')
// 错误提示
const tips = {
  1: '未知错误',
  1005: '',
  3000: ''
}
class https {
  static _fun(url, method, data = {}, header) {
    const driverRowID = wx.getStorageSync("driverRowID") || ""
    if (driverRowID) {
      data.driverRowID = driverRowID;
    }
    var header = {
      "accept": "*/*",
      "content-type": "application/x-www-form-urlencoded"
      //"content-type": "application/json"
    }
    let promise = new Promise((resolve, reject) => {
      wx.request({
        url: config.base_url + config.base_api + url,
        header: header,
        data: data,
        method: method,
        success: (res) => {
          // 服务器 非200 错误
          if (res.statusCode && res.statusCode != 200) {
            wx.showToast({
              title: '服务器 ' + res.statusCode + ' 错误',
              icon: 'none'
            });
            reject(res);
            return;
          }
          let data = res.data;
          if (data &&( data.repCode == '0004'||data.repCode =='0007')) {
            console.log(data.repCode)
            wx.showToast({
              title: '登录过期，3秒后跳转到登录页。',
              mask: true,
              icon: 'none',
              duration: 3000,
              complete: function () {
                setTimeout(() => {
                  wx.clearStorageSync();
                  wx.reLaunch({
                    url: '/pages/login/login'
                  })
                }, 3000)
              }
            })
            return
          }
          if (data && data.repCode != '0000') {
            // 业务状态非0000 提示
            wx.showToast({
              title: data.repMsg || '服务器处理异常，请稍后再试!',
              icon: 'none'
            });
            reject(res);
            return;
          }
          // let repData=data.repData;
          // if(repData && !repData.isSuccessed){
          //   wx.showToast({
          //     title: repData.returnMessage || '服务器处理异常，请稍后再试!',
          //     icon: 'none'
          //   });
          //   reject(res);
          //   return;
          // }
          resolve(res.data);
        },
        fail: (err) => {
          console.log(err)
          if (err.errMsg.indexOf('request:fail') > -1) {
            wx.showToast({
              title: '请求超时，请稍后再试！',
              icon: 'none'
            });
          }
          if (err.errMsg.indexOf('url not in domain list') > -1) {
            wx.showToast({
              title: '请求url不在合法域名中，请打开调试模式',
              icon: 'none'
            });
          }
          reject(err);
        },
        complete: () => {}
      });
    });
    return promise;
  }
  static _uploadFun(url, filePath, data = {}) {

    let header_type = {
      "content-type": 'multipart/form-data'
    };

    let promise = new Promise((resolve, reject) => {
      wx.uploadFile({
        url: config.base_url + config.base_api + url,
        filePath: filePath,
        name: "file",
        formData: data,
        header: header_type,
        success(res) {
          // 服务器 非200 错误
          if (res.statusCode && res.statusCode != 200) {
            wx.showToast({
              title: '服务器 ' + res.statusCode + ' 错误',
              icon: 'none'
            });
            reject(res);
            return;
          }
          let data = res.data && JSON.parse(res.data);
          if (data && data.repCode != '0000') {
            // 业务状态非0000 提示
            wx.showToast({
              title: data.repMsg || '服务器处理异常，请稍后再试!',
              icon: 'none'
            });
            reject(res);
            return;
          }
          resolve(data);
        },
        fail(err) {
          console.log("error", err)
          if (err.errMsg.indexOf('request:fail') > -1) {
            wx.showToast({
              title: '请求超时，请稍后再试！',
              icon: 'none'
            });
          }
          if (err.errMsg.indexOf('url not in domain list') > -1) {
            wx.showToast({
              title: '请求url不在合法域名中，请打开调试模式',
              icon: 'none'
            });
          }
          reject(err);
        }
      })
    })
    return promise;
  }
  // 错误处理函数
  static _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }

  static get(url, data, header) {
    return this._fun(url, "GET", data, header);
  }

  static post(url, data, header) {
    return this._fun(url, "POST", data, header);
  }
  // 上传文件api
  static uploadFile(filePath, data) {
    return this._uploadFun("/upload/weChatAppUploadImg", filePath, data);
  }
}
module.exports = https;