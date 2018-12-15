import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import './utils/filter'
import './utils/cmp'

import '@/icons' // icon
import '@/permission' // permission control
import { roles, sex } from '@/utils/enum'
// Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  data() {
    return {
      roles,
      sex,
      fileurl: window.cfg.fileurl || window.cfg.baseurl,
    }
  },
  methods: {
    getFileUrl(url) {
      return this.fileurl + url;
    }
  },
  router,
  store,
  render: h => h(App)
})
