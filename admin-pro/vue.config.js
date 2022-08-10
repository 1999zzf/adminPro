// const host = require('./public/basicHost')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    './' :
    '/',
  devServer: {

    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    // proxy: {
    //   '/api': {
    //     target: "http://192.168.1.127:8080/sorting_web/", // 接口的域名
    //     // secure: false,  // 如果是https接口，需要配置这个参数
    //     changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
    //     pathRewrite: {
    //       '^/api': '/'
    //     }
    //   }
    // },

  },
};