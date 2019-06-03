import Layout from '../pages/admin/layout'

import Home from '../pages/admin/home'
import UsersManage from '../pages/admin/user/index'
import ArticlesManage from '../pages/admin/articles'
import CommentsManage from '../pages/admin/comments'
import LikesManage from '../pages/admin/likes'
import Info from '../pages/admin/info'
import AvatarManage from "../pages/admin/info/avatar/index"
import InfoManage from "../pages/admin/info/profile/index"
import UserArticlesManager from '../pages/admin/useArticles'
import CategtoriesManager from '../pages/admin/categories'
import NotFound from '../pages/404/index'

export default {
  path: '/user',
  name: 'user',
  component: Layout,
  routes: [
    {
      path: '/user/',
      icon: 'home',
      name: '首页',
      component: Home,
      exact: true,
    },
    {
      path: '/user/userinfo',
      icon: 'info',
      name: '个人信息',
      component: Info,
      routes: [
        { path: '/user/userinfo/avatar', icon: 'user',  name: '头像更换', component: AvatarManage },
        { path: '/user/userinfo/info', icon: 'profile', name: '信息修改', component: InfoManage },
      ]
    },
    {
      path: '/user/users',
      name: '用户管理', 
      icon: 'user', 
      component: UsersManage
    },
    {
      path: '/user/categories',
      icon: 'edit',
      name: '分类管理',
      component: CategtoriesManager
    },
    {
      path: '/user/articles',
      icon: 'edit',
      name: '我的文章',
      component: ArticlesManage
    },
    {
      path: '/user/comments',
      icon: 'book',
      name: '我评论的',
      component: CommentsManage
    },
    {
      path: '/user/likes',
      icon: 'like',
      name: '我喜欢的',
      component: LikesManage
    },
    {
      path: '/user/userArticles',
      icon: 'edit',
      name: '文章管理',
      component: UserArticlesManager
    },
    { path: '*', component: NotFound}
  ]
}