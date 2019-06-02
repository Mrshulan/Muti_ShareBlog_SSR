import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getSongList } from '../redux/reducers/home'
import styles from './home.less'
import { Button } from 'antd'
class Home extends React.Component {
  // 若是走node直出getInitialProps执行 且不影响生命周期
  static getInitialProps(store) {
    const { getSongList } = mapDispatchToProps(store.dispatch)
    
    // 这里必须return Promise 并且这里发起请求走的是node环境 server-entry，api路径必须写绝对路径http://。
    return Promise.all([
      getSongList(3)
    ])
  }

  componentDidMount() {
    const { songList, getSongList } = this.props
    songList.length || getSongList(3)
  }

  render() {
    const { loaded, songList} = this.props
    return (
      <ul className={ styles.home }>        
        这里是home界面
        {
          loaded ? 
            <div>正在加载...</div> :
            songList.map(item => {
              return  (
                <li key={item.songmid}>
                  <Link to={{pathname: '/songList/' + item.songmid, state: {songname: item.songname}}}>
                    <Button type="primary">点击去听</Button>  {item.songname}              
                  </Link></li>
              )
            })
        }
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return { ...state.home }
}
function mapDispatchToProps(dispatch) {
  return {
    getSongList: (id) => dispatch(getSongList(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
