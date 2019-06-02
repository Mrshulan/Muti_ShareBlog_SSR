import axios from 'axios'
// 此时才是真正的服务端, 请求, node只不过是中间件
module.exports = {
  getTopid: async (ctx, next) => {
    const { id } = ctx.query
    const songList = await axios.get('http:/mrshulan.xin/musicapi/getTopid?id=' + id).then(res => res.data)
    ctx.body = songList
    ctx.type = 'json'
  },
  getSongUrl: async (ctx, next) => {
    
  }
}