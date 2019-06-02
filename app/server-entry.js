import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { matchRoutes } from 'react-router-config'
import createApp from './createApp'

// 生成serverBundle 将ctx转换成jsx 之后通过renderToString转化成html模版 在通过自己正则注入数据返回clent
export default ctx => {
  return new Promise((resolve, reject) => {
    const { routes, store, routerConfig } = createApp()
    // 根据自己routerConfig的匹配上的完整输出(pages里边页面上的顶层组件)
    const matchedroutes = matchRoutes(routerConfig, ctx.url)
    // console.log(matchedroutes)
    // 没有匹配上的路由则返回404
    if(matchedroutes.length <= 0) {
      return reject({ status: 404, message: 'Not Found Page'})
    }
    // 等所有数据请回求来之后在render, 注意这里不能用ctx上的路由信息，要使用前端的路由信息
    const promises = matchedroutes.filter(item => item.route.component.getInitialProps)
      .map(item => item.route.component.getInitialProps(store, item.match))

      
    Promise.all(promises).then((res) => {
      // console.log(res) // [ [{ type: 'HOME/SUCCESS', result: [Object] }] ]
      ctx.store = store // 挂载到ctx上，方便渲染到页面上
      // 最终的控制权resolve在这里
      // console.log(routes)
      resolve(
        <Provider store={store}>
          <StaticRouter location={ctx.url} context={ctx}>
              { routes } 
          </StaticRouter>
        </Provider>
      )
    })
    .catch(err => {
      reject(res)
    })
    
  })
}