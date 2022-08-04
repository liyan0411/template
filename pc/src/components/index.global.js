function changeStr(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const requireComponent = require.context("./global", false, /\.vue$/);
const components = Vue => {
  requireComponent.keys().forEach(fileName => {
    // console.log(fileName);

    let config = requireComponent(fileName);
    // console.log(config);
    let component = changeStr(fileName.replace(/^\.\//, "")).replace(
      /\.\w+$/,
      ""
    );
    // console.log(component);
    // 使用文件名 注册全局高频使用组件
    Vue.component(component, config.default || config);
  });
};

export default components;
