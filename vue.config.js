/*
 * @Description: 
 * @Author: mzr
 * @Date: 2021-11-08 13:57:07
 * @LastEditTime: 2021-12-06 13:41:17
 * @LastEditors: mzr
 */
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    moment: {
      locales: ["zh-cn"],
    },
  },
  devServer: {
    proxy: 'http://192.168.0.69:9591',
  },
  productionSourceMap: false
}
