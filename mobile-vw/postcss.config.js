// https://github.com/michael-ciniawsky/postcss-load-config
const path = require('path');
module.exports = ({ webpack }) => {
  const designWidth = webpack.resourcePath.includes(path.join('node_modules', 'vant')) ? 375 : 750;

  return {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
      },
      "postcss-px-to-viewport": {
        unitToConvert: "px",
        viewportWidth: designWidth,
        unitPrecision: 6,
        propList: ["*"],
        viewportUnit: "vw",
        fontViewportUnit: "vw",
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: true,
        exclude: [],
        landscape: false
      }
    }
  }

}
