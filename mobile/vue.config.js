const path = require("path");

const defaultSettings = require("./src/config/index.js");
const join = dir => {
  return path.join(__dirname, dir);
};
const resolve = dir => {
  return path.resolve(__dirname, dir);
};
const name = defaultSettings.title || "vant-demo"; // 标题
// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const PUBLIC_PATH = "/";

module.exports = {
  publicPath: PUBLIC_PATH,
  // productionSourceMap：{ type:Bollean,default:true } 生产源映射
  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
  outputDir: "dist",
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        modifyVars: {
          // "button-default-height": "55px",
          // "button-primary-color": "#111",
          // "button-primary-background-color": "#eee",
          // "button-primary-border-color": "#ccc"
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${resolve("src/styles/theme.less")}";`
        },
        javascriptEnabled: true
      }
    }
  },
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    port: 8088, // 端口号
    host: "0.0.0.0",
    open: false // 配置自动启动浏览器
    // proxy: {
    // '/api': {
    //   target: "https://tknt.tkw100.com/",
    //   changeOrigin: true,
    //   ws: true,
    //   pathRewrite: {
    //     '^/api': '',
    //   },
    // },
    // }
  },
  //  chainWebpack 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
  // chainWebpack: config => {
  // config.resolve.alias
  //   .set('@', join('src')) // key,value自行定义，比如.set('@', join('src/components'))
  //   .set('_c', join('src/components'))
  // },
  // webpack配置
  configureWebpack: config => {
    config.name = name;
    config.resolve = {
      extensions: [".js", ".vue", ".json", ".css"],

      alias: {
        "@": join("src"),
        _c: join("src/components"),
        vue$: "vue/dist/vue.esm.js"
      }
    };

    // 关闭 webpack 的性能提示
    config.performance = {
      hints: false
    };
  }
};
