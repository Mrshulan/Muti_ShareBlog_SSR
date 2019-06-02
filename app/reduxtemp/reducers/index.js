import { homeReducer } from './home'
import { listReducer } from './list'
import { combineReducers } from 'redux'

export default combineReducers({
  home: homeReducer,
  list: listReducer,
})