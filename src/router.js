import Vue from 'vue'
import Router from 'vue-router'
import Web from '@/layout/web'
import Admin from '@/layout/admin'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/admin',
      redirect: '/admin/index'
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./views/404/404.vue')
    },
    {
      path: '/home',
      component: Web,
      children: [
        {
          path: '',
          component: () => import('@/views/web/Home'),
          name: 'home'
        }
      ]
    },
    {
      path: '/study',
      component: Web,
      children: [
        {
          path: '',
          component: () => import('@/views/web/Study'),
          name: 'study'
        }
      ]
    },
    {
      path: '/note',
      component: Web,
      children: [
        {
          path: '',
          component: () => import('@/views/web/Note'),
          name: 'note'
        }
      ]
    },
    {
      path: '/zone',
      component: Web,
      children: [
        {
          path: '',
          component: () => import('@/views/web/Zone'),
          name: 'zone'
        }
      ]
    },
    {
      path: '/about',
      component: Web,
      children: [
        {
          path: '',
          component: () => import('@/views/web/About'),
          name: 'about'
        }
      ]
    },
    {
      path: '/details',
      component: Web,
      children: [
        {
          path: '',
          component: () => import('@/views/web/Details'),
          name: 'details'
        }
      ]
    },
    // 管理端路由
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: 'index',
          component: () => import('@/views/admin/Index'),
          name: 'index'
        },
        {
          path: 'book',
          component: () => import('@/views/admin/Book'),
          name: 'book'
        },
        {
          path: 'url',
          component: () => import('@/views/admin/Url'),
          name: 'url'
        },
        {
          path: 'article',
          component: () => import('@/views/admin/Article'),
          name: 'article'
        },
        {
          path: 'comment',
          component: () => import('@/views/admin/Comment'),
          name: 'comment'
        },
        {
          path: 'message',
          component: () => import('@/views/admin/Message'),
          name: 'message'
        },
        {
          path: 'user',
          component: () => import('@/views/admin/User'),
          name: 'user'
        },
        {
          path: 'set',
          component: () => import('@/views/admin/Set'),
          name: 'set'
        }
      ]
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
