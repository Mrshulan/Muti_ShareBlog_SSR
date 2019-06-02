import * as api from '../../api/music'

const initialState = {
  loaded: false,
  songUrl: ''
}

// 会经过一波sync中间件洗礼 
export const getSongUrl = (mid) => ({
  types: [
    "LIST/FETCH",
    'LIST/SUCCESS',
    'LIST/FAILURE'
  ],
  sync: () => api.getSongUrl(mid)
})

export function listReducer (state  = initialState , action) {
  switch(action.type) {
    case 'LIST/FETCH':
      return Object.assign({}, state, { loaded: true });
    case 'LIST/SUCCESS':
      return Object.assign({}, state, { loaded: false, songUrl: action.result })
    case 'LIST/FAILURE':
      return Object.assign({}, state, { loaded: false })
    default: 
      return state
  }
}
