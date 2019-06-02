import * as api from '../../api/music'

const initialState = {
  loaded: false,
  songList: []
}

// 会经过一波sync中间件洗礼 
export const getSongList = (id) => ({
  types: [
    "HOME/FETCH",
    'HOME/SUCCESS',
    'HOME/FAILURE'
  ],
  sync: () => api.getSongList(id)
})

export function homeReducer (state = initialState, action) {
  
  switch( action.type ) {
    case 'HOME/FETCH':
      return Object.assign({}, state, { loaded: true });
    case 'HOME/SUCCESS':
      return Object.assign({}, state, { loaded: false, songList: state.songList.concat(action.result.songList) })
    case 'HOME/FAILURE':
      return Object.assign({}, state, { loaded: false })
    default: 
      return state
  }
}