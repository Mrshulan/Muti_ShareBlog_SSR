import React from 'react'
import { Icon, Avatar } from 'antd'
import './index.less'
import Categories from '../../categories'
const isPro = process.env.NODE_ENV === 'production'

const SliderRight = ({data}) => {
  let { avatar, username, tellphone, info: { email, weibo,  signature} } = data
  let link = [
        {
          url: 'https://github.com/Mrshulan',
          icon: 'github'
        },
        {
          url: weibo || 'https://weibo.com/AKingDMJim',
          icon: 'weibo'
        }
      ]
    
  const linkList = link.map(item => (
    <a key={item.icon} target="_blank" rel='noopener noreferrer' href={item.url}>
      <Icon
        key={item.icon}
        type={item.icon}
        theme="outlined"
        style={{ fontSize: '20px', marginRight: '10px' }}
      />
    </a>
  ))
  // 处理一下头像链接
  // avatar = isPro ? 'http://mrshulan.xin' : 'http://127.0.0.1:6001' + avatar

  return ( 
  <div styleName="right">
      <Avatar styleName="right-logo" src={(isPro ? 'http://mrshulan.xin' : 'http://127.0.0.1:6001') + avatar} size={130} icon="user" />
      <div styleName="title">{username || '你的名字'}</div>
      <div styleName="right-signature">
        { signature || '像狗一样的学习,像狗一样的学习' }
      </div>
      <div styleName="right-info">
        <div styleName="title">个人介绍</div>
        <div styleName="introduce">
          电话: {tellphone || '18473871766'}
          <br/>
          邮箱：{email || 'adengminjie@163.com'}
        </div>
        <div styleName="footer">{linkList}</div>
      </div>
      <div styleName="tags">
        <div styleName="title">归档</div>
        <Categories />
      </div>
    </div>
  )
}

export default SliderRight