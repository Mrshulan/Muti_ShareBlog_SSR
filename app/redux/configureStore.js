import { createStore, applyMiddleware, compose} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './modules'

let finalCreateStore

if(process.env.NODE_ENV !== 'production') {
  finalCreateStore = compose(composeWithDevTools(
    applyMiddleware(thunk)
  ))(createStore)
} else {
  finalCreateStore = applyMiddleware(thunk)(createStore)
}

export default function configure(initialState) {
  const store = finalCreateStore(rootReducer, initialState)

  // 支持reducer的热加载
  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./modules", () =>
      store.replaceReducer(require("./modules"))
    )
  }

  return store
}