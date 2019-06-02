const Koa = require('koa')
const fs = require('fs')
const path = require('path')

const render = require('./render')
const router = require('./router')

const resolve = file => path.resolve(__dirname, file)
const app = new Koa()
const env = process.env.NODE_ENV
const config = require('../build/config')[env]
const isPro = process.env.NODE_ENV === 'production'

let serverBundle
let template
let readyPromise

if(isPro) {
  serverBundle = require('../dist/js/server-bundle').default
  template = fs.readFileSync(resolve('../dist/server.tpl.html'), 'utf-8');
} else {
  readyPromise = require('../build/dev-server')(app, resolve('../app/index.html'));
}

// 所有需要直出的html 都走这条统一路
router.get('*', async (ctx, next) => {

  if (isPro) {
      await render(ctx, serverBundle, template)
  } else {
      const { bundle, clientHtml } = await readyPromise
      await render(ctx, bundle, clientHtml)
  }
  next()
})

app.use(require('koa-static')(path.join(__dirname, '../dist')))
app.use(router.routes(), router.allowedMethods())

app.listen(config.port, () => {
  console.log(`node服务已启动，服务地址为：localhost:${config.port}`)
});