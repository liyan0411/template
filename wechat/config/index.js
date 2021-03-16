const severType = 3;
/**
 *  severType 值对应环境 以及对应git分支
 * 1 个人 本地
 * 2 开发 develop
 * 3 生产 prod
 */
// request 接口根路径
const root = function (type=severType) {
  switch (type) {
    case 1:
      return "http://10.108.12.18:8088";
    case 2:
      // 开发 暂用安吉助手域名
      return "http://crmdev.ajhroro.com";
      // 开发
      // return "http://dev-htdrv-app.anji-plus.com";
    default:
      return "https://cpapp.haitongauto.com";
  }
};
// 图片根路径
const getImgRoot = function (type=severType) {
  switch (type) {
    case 1:
    case 2:
      return "http://crmdev.ajhroro.com";
    default:
      return "https://cpapp.haitongauto.com";
  }
};
// ocr 配置
const ocrSetting = function (type=severType) {
  switch (type) {
    // 个人
    case 1:
    case 2:
      return {
        APIKEY: "rDcANxja9TeVePp8emcBNxRq",
        SECKEY: "Nr0GopGMK2tdxNrjeQnfcF1cPlGg6GGH"
      };
    // 公司
    default:
      return {
        APIKEY: "SMMZ1U6NM0Oy2Q97SKHoWw6D",
        SECKEY: "3Ctg6f1lAHVZxt6gFsBVGIip1G09iucR"
      };
  }
}
module.exports = {
  // 请求地址api  根路径
  base_url: root(),
  base_api: "/haitong/api",
  // 获取静态资源图片根路径
  img_url: getImgRoot(3) + "/haitong/images/",
  // 图片档案地址根路径
  base_path: getImgRoot(),
  // 百度ocr 接口路径
  ocr_url: "https://aip.baidubce.com/",
  // 打点频率  定时器值
  gpsTime: 1000*60*5,
}