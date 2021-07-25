import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'
import router from './router'
import store from './store'
import localforage from 'localforage'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  localforage,
  render: h => h(App)
}).$mount('#app')
