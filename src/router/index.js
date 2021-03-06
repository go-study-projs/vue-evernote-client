import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: _ => import('@/components/Login')
    },
    {
      path: '/notebooks',
      component: _ => import('@/components/NotebookList'),
      meta: { needLogin: true }
    },
    {
      path: '/note',
      component: _ => import('@/components/NoteDetail'),
      meta: { needLogin: true }
    },
    {
      path: '/trash',
      component: _ => import('@/components/TrashDetail'),
      meta: { needLogin: true }
    }
  ]
})

export default router
