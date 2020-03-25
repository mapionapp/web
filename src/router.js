import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/impressum',
    name: 'imprint',
    component: () => import('./pages/imprint-page'),
  },
  {
    path: '/datenschutz',
    name: 'privacy',
    component: () => import('./pages/privacy-page'),
  },
  {
    path: '/tour',
    name: 'tour',
    component: () => import('./pages/tour'),
  },
  {
    path: '/:placeId?',
    name: 'index',
    component: require('./pages/map-page').default,
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router
