# 文档
将 app.json 中的 "style": "v2" 去除，小程序的新版基础组件强行加上了许多样式，难以覆盖，不关闭将造成部分组件样式混乱。
## 目录结构

```js
├──src
  ├── assets               # 静态资源
  ├── conponents           # 组件
  ├── config               # 配置文件
  ├── miniprogram_npm      # 构建 npm 包
  ├── node_modules         # 依赖资源包
  ├── pages                # 页面
  ├── styles               # 公共样式
  ├── utils                # 封装的工具函数
  ├── wxs                  # 过滤器
  ├── .gitignore           # git 忽略项
  ├── app.js               # 入口js文件
  ├── app.json             # 全局配置
  ├── app.wxss             # 全局样式
  ├── package.json         # package.json 项目相关以及插件版本
  ├── package-lock.json    # 在 `npm install`时候生成一份文件,用以记录当前状态下实际安装的各个npm package的具体来源和版本号
  ├── project.config.json  # 工具的统一配置
  ├── sitemap.json         # 配置小程序及其页面是否允许被微信索引
  └── README.md            # 说明文档
```
## 编译运行
```
// 拉取代码后 初始化npm包
npm install  || npm i
// 包下载好之后 构建npm
打开小程序编辑器-> 工具栏-> 工具->构建npm ->编译运行
```

## request合法域名
百度ocr：https://XXX

request接口：https://XXX

## uploadfile合法域名
图片上传：https://XXX

