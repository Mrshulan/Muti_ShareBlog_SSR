const fs = require('fs')
const path = require('path')
const MFS = require('memory-fs')
const webpack = require('webpack')
const chokidar = require('chokidar')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

const readFile = (fs, file) => {
  return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
}

module.exports = function(app, templatePath) {
  let bundle
  let template
  let clientHtml

  // 这里其实就是吧resolve单独拿出来了，其实你也可以直接吧下面的代码写在promise里面，这样的好处就是减少代码嵌套。
  let ready
  const readyPromise = new Promise(r => {
    // 控制权交出
    ready = r
  })
  // 更新触发函数
  const update = () => {
    if(bundle && clientHtml) {
      ready({ bundle, clientHtml })
    }
  }

  // 监听模版文件
  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    console.log('index.html template has updated.')
    update()
  })


  // 监听热更新的入口
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

  // 创建dev服务 监听并且更新client入口文件
  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require('koa-webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true
  });
  // 挂载上Koa服务的中间上
  app.use(devMiddleware)

  clientCompiler.hooks.done.tap('DevPlugin', stats => {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) return
    // 获取dev内存中入口html
    clientHtml = readFile(
      devMiddleware.fileSystem,
      'server.tpl.html',
    )
    // 更新
    update()
  })

  // 开启热更新
  app.use(require('koa-webpack-hot-middleware')(clientCompiler))

  // 监听并且更新server入口文件
  const serverCompiler = webpack(serverConfig)

  // 创建一个内存文件系统
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return

    // 获取内存中的server-bundle 此时bundle就有了
    bundle = eval(readFile(mfs, 'js/server-bundle.js')).default;
    update()
  })

  // 交给外层出触发
  return readyPromise
}