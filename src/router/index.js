import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
            component: _ => import('@/components/NotebookList')
        },
        {
            path: '/note',
            component: _ => import('@/components/NoteDetail')
        },
        {
            path: '/trash',
            component: _ => import('@/components/TrashDetail')
        }
    ]
})
