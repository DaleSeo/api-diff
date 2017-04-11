import Vue from 'vue'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
import App from './App.vue'

Vue.use(VueRouter)
Vue.use(VueFire)

import Index from './components/Index.vue'
import ApiConfig from './components/config/ApiConfig.vue'
import Suite from './Suite.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Index},
    {path: '/config/:apiKey', component: ApiConfig, props: true},
    {path: '/suites/:id', component: Suite, props: true}
  ]
})

new Vue({
  router,
  template: '<App/>',
  components: {App}
}).$mount('#app')
