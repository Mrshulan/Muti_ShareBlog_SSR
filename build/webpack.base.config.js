const { resolve } = require('./utils')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = config => {
  const baseConfig = {
    // 入口
    entry: resolve('app/main.js'),
    // 出口
    output: {
      path: resolve('dist'),
      publicPath: config.publicPath,
      // 入口文件产生的js
      filename: config.noHash ? 'js/[name].js' : 'js/[name].[chunkhash:8].js',
      // 非入口文件生产的js
      chunkFilename: config.noHash ? 'js/[id].js' : 'js/[id].[chunkhash:8].js'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: config.noHash ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
      })
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: [resolve('node_modules')],
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ],
              plugins: [
                [ "import",{ libraryName: "antd", style: true }],
                "@babel/plugin-transform-runtime",
                '@babel/plugin-syntax-dynamic-import',
                ["@babel/plugin-proposal-class-properties", { "loose": false }],
                ["react-css-modules", { 
                  generateScopedName: '[path][local]-[hash:base64:5]',
                  filetypes: {
                    '.less': {
                        syntax: 'postcss-less'
                    }
                  },
                  }
                ]
              ]
            }
          }
        },
        {
          test: /\.(less|css)$/,
          include: [resolve('node_modules')], // 由于默认我们的css module(哈希后缀)单独配置antd的less加载          
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'less-loader',
              options: {
                modifyVars: {
                  "primary-color": "#00b38a",
                  "link-color": "#00b38a",
                },
                javascriptEnabled: true,
              }
            }
          ]
        },
        {
          test: /\.less$/,
          include: [resolve('app')],     
          use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    modules: true,
                    localIdentName: '[path][local]-[hash:base64:5]'
                },
            },
            'less-loader'
          ]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: `url-loader?limit=4000&name=${config.imagePath}${config.noHash ? '[name].[ext]' : '[name].[contenthash:8]'}.[ext]`
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: `file-loader?name=${config.publicPath}fonts/${config.noHash ? '[name].[ext]' : '[name].[contenthash:8]'}.[ext]`
        },
      ]
    },
    optimization: {
      // 压缩css，由于配置css的压缩会覆盖默认的js压缩，所以js压缩也需要手动配置下
      minimizer: [
        new UglifyJsPlugin({
            cache: true,
            parallel: true, // 多进程压缩
            // sourceMap: true, // set to true if you want JS source maps
            uglifyOptions: {
              output: {
                comments: false, // 删除所有注释
              },
              compress: {
                // warning: false, // 进行删除一些无用代码的时候，不提示警告，
                drop_console: true, // 过滤掉console
                collapse_vars: true,  //内嵌已定义但只使用一次的变量
                reduce_vars: true,  //提取使用多次但没定义的静态值到变量
              }
            }
          }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    resolve: {
      // 路径别名
      alias: {
        '@': resolve('app')
      },
      // 补全后缀
      extensions: ['.js', '.jsx']
    },
    // 第三方依赖不打包
    externals: {}
  }
  

  return baseConfig
}