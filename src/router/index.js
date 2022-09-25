import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/view/Layout'
import Home from '@/view/Home'
import Search from '@/view/Search'
import Play from '@/view/Play'
import Comment from '@/view/Comment'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        component: Home,
        meta: {
          title: '首页'
        }
      },
      {
        path: 'search',
        component: Search,
        meta: {
          title: '搜索'
        }
      }
    ]
  },
  {
    path: '/play',
    component: Play
  },
  {
    path: '/comment',
    component: Comment
  }
]

const router = new VueRouter({
  routes
})

export default router
