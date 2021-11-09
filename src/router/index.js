/*
 * @Description: 
 * @Author: mzr
 * @Date: 2021-11-04 11:31:31
 * @LastEditTime: 2021-11-04 16:54:06
 * @LastEditors: mzr
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 登录页面
  {
    path: '/',
    name: 'Index',
    component: () => import( '../views/Home.vue')
  },
  // 日志查询页面
  {
    path: '/log',
    name: 'Log',
    component: () => import( '../views/Log.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
