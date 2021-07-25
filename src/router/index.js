import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mainPage',
    component: () => import('@/views/mainPage.vue'),
    children: [
      {
      path: '/',
      name: 'table',
      component: () => import('../components/tables/main_table.vue'),
      }
    ]
  },
  {
    path: '/order/',
    name: 'order',
    component: () => import('@/views/order_info.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
