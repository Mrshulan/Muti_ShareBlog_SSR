import React, { Component } from 'react'
import { NavLink, } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import routes from  '@/routes/admin'
import { connect } from 'react-redux'

const SubMenu = Menu.SubMenu

class Siderbar extends Component {
  state = {
    openKeys: [],
    selectedKeys: []
  }

  componentDidMount() {
    const pathname = window.location.pathname
    let index = pathname.lastIndexOf('/')
    const openKeys = [pathname.slice(0, index)]
    this.setState({ selectedKeys: [pathname], openKeys })
  }

  renderMenu = data => {
    const renderRoute = (item) => {
      if(this.props.role === '1' && item.path === '/user/users') return
      if(this.props.role === '1' && item.path.includes('userArticles')) return
      if(this.props.role === '1' && item.path.includes('categories')) return
      
      if(item.routes) {
        return (
          <SubMenu
            title={
              <span>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.name}</span>
              </span>
            }
            key={item.path}
          >
           {item.routes.map(r => renderRoute(r))}
          </SubMenu>
        )
      } else {
        return (
          item.name && (
            <Menu.Item key={item.path}>
              <NavLink to={item.path}>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.name}</span>
              </NavLink>
            </Menu.Item>
          )
        )
      }
    }
    return data.routes.map(d => renderRoute(d))
  }

  onOpenChange = openKeys => {
    this.setState({ openKeys })
  }

  render() {
    const { openKeys, selectedKeys } = this.state

    return (
      <div className="sibar-container" style={{ height: '100vh' }}>
        <Menu
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={this.onOpenChange}
          onClick={({ key }) => this.setState({ selectedKeys: [key] })}
          theme="dark"
          mode="inline"
        >
          {this.renderMenu(routes)}
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    role: state.auth.role
})

export default connect(mapStateToProps)(Siderbar)