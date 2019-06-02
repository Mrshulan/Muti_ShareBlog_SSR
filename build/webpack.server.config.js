const { resolve } = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const config = require('./config')[process.env.NODE_ENV]

module.exports = merge(baseConfig(config), {
  target: 'node',
  // devtool: config.devtool,
  mode: config.env,
  entry: resolve('app/server-entry.js'),
  output: {
    filename: 'js/server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  // 在base.config里边配置了
  // exclude: [resolve('node_modules')]
  // 服务端打包的时候忽略外部的npm包 antd按需加载css 是通过antd/lib/里边的js来触发css的
  externals: nodeExternals({
    whitelist: [/antd\/lib\/(.+)\/style/,]
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.env),
      'process.env.REACT_ENV': '"server"'
    })
  ]
})