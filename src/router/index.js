import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Course from '@/views/course'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunKName: 'login' */'@/views/login')
  },
  {
    path: '/',
    name: 'course',
    component: Course
  },
  {
    path: '/learn',
    name: 'learn',
    component: () => import(/* webpackChunKName: 'learn' */'@/views/learn'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunKName: 'user' */'@/views/user'),
    meta: { requiresAuth: true }
  },
  {
    path: '/course-info/:courseId',
    name: 'course-info',
    component: () => import(/* webpackChunKName: 'course-info' */'@/views/course-info'),
    props: true
  },
  {
    path: '/lesson-video/:lessonId/',
    name: 'lesson-video',
    component: () => import(/* webpackChunkName: 'lesson-video' */'@/views/course-info/video'),
    props: true
  },
  {
    path: '/pay/:courseId/',
    name: 'pay',
    component: () => import(/* webpackChunkName: 'pay' */'@/views/pay'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunKName: 'error-page' */'@/views/error-page')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      return next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
    next()
  } else {
    next()
  }
})

export default router
