/**
 * 配置文件
 * 生产环境 production
 * 开发环境 development
 * 注意: api路径必须是全称，因为在服务端渲染的时候也会按照这里的路径请求。
 */

 module.exports = {
  // 生产环境
  production: {
    port: 6003,                              // 服务器启动的端口号
    env: 'production',                      // 环境
    publicPath: '/',                        // 静态资源地址
    noHash: false,                          // 生产的静态资源是否需要hash值(便于开发)
  },
  // 开发环境
  development: {
    port: 3000,                             // 服务器启动的端口号
    env: 'development',                     // 环境
    publicPath: '/',                        // 静态资源地址
    devtool: 'eval',                        // devtool
    noHash: true,                           // 开发的静态资源是否需要hash值(便于开发)
  }
 }