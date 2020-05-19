import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import './permission'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'

Vue.config.productionTip = false

Vue.use(Element)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
