import routerConfig from './routes/index'
import createStore from './redux/configureStore'
import { renderRoutes } from 'react-router-config'


// 提取公共使用代码
export default function(store = {}) {
  return {
    routes: renderRoutes(routerConfig),
    store: createStore(store),
    routerConfig,
  }
}