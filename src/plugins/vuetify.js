/*
 * @Description: 
 * @Author: mzr
 * @Date: 2021-11-08 13:57:07
 * @LastEditTime: 2021-11-29 18:22:55
 * @LastEditors: mzr
 */
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import zhHans from 'vuetify/lib/locale/zh-Hans'

Vue.use(Vuetify);

Vue.component('my-component', {
  methods: {
    changeLocale() {
      this.$vuetify.lang.current = 'sv'
    },
  },
})

export default new Vuetify({
  lang: {
    locales: { zhHans },
    current: 'zhHans',
  },
});
