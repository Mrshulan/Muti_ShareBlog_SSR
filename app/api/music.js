import axios from 'axios'

const baseUrl = 'http://mrshulan.xin/musicapi/'

export const getSongList = (id) => {
  return axios.get(baseUrl + 'getTopid?id=' + id).then(res => res.data)
}
export const getSongUrl = (songmid) => {
  return axios.get(baseUrl + 'getSongUrl/' + songmid).then(res => res.data)
}