import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'
import { createStyleImportPlugin, NutuiResolve } from 'vite-plugin-style-import'
import postCssPxToRem from "postcss-pxtorem"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createStyleImportPlugin({
      resolves: [
        NutuiResolve(),
      ]
    }),
  ],
  css: {
    // 此代码为适配移动端px2rem
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.5, // 1rem的大小
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
        })
      ]
    },
    preprocessorOptions: {
      scss: {
        // 配置 nutui 全局 scss 变量
        additionalData: `@import "./src/style/custom_theme.scss";@import "@nutui/nutui/dist/styles/variables.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  base: './', // 设置打包路径
  server: {
    port: 4000, // 设置服务启动端口号
    open: false, // 设置服务启动时是否自动打开浏览器
    cors: true // 允许跨域

    // 设置代理，根据我们项目实际情况配置
    // proxy: {
    //   '/api': {
    //     target: 'http://xxx.xxx.xxx.xxx:8000',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace('/api/', '/')
    //   }
    // }
  }
})