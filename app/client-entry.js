import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux'
import createApp from './createApp'
// import 'antd/dist/antd.css'
const hydratedEl = document.getElementById('SSR_HYDRATED_DATA')
const hydrateData = JSON.parse(hydratedEl.textContent)

const { routes, store } = createApp(hydrateData)
console.log(routes)
console.log(hydrateData)
// 在浏览器端渲染时 注水 也就是store
// 在development下 hyrate text node有警告(仅仅是语义而已)
// 在production下 hyrate text node无警告
ReactDom.hydrate(
  <Provider store={store}>
    <BrowserRouter>{ routes }</BrowserRouter>
  </Provider>,
  document.getElementById('app')
)