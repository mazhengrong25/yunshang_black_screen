/*
 * @Description: 
 * @Author: mzr
 * @Date: 2021-11-08 13:55:06
 * @LastEditTime: 2021-11-29 18:17:07
 * @LastEditors: mzr
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import DatetimePicker from 'vuetify-datetime-picker'

Vue.use(DatetimePicker)

import axios from '@/api'
Vue.prototype.$axios = axios;

import moment from 'moment';
Vue.prototype.$moment = moment;

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
