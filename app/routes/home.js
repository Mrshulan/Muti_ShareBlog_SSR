import Layout from '../pages/index/layout'

import Articles from '../pages/index/articles/articles.jsx'
import Article from '../pages/index/article/article.jsx'
import Editor from '../pages/index/editor/index.jsx'
import Categories from '../pages/index/categories/index.jsx'
import About from '../pages/index/about/index'
import NotFound from '../pages/404/index'

export default {
  path: '/',
  component: Layout,
  routes: [
    {path: '/', component: Articles, exact: true},
    {path: '/article/:id', component: Article},
    {path: '/editor', component: Editor},
    {path: '/categories/:id', component: Articles},
    {path: '/categories', component: Categories},
    {path: '/hot', component: Articles},
    {path: '/about', component: About},
    {path: '*', component: NotFound}
  ]
}