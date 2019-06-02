import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from '../reducers'
import sync from '../middlewares/sync'

export default data => {
  return createStore(reducers, data, process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(sync)) : applyMiddleware(sync))
}