import Vue from 'vue'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
import App from './App.vue'

Vue.use(VueRouter)
Vue.use(VueFire)

import Index from './components/Index.vue'
import ApiConfig from './components/config/ApiConfig.vue'
import ApiTest from './components/test/ApiTest.vue'
import Suite from './components/test/Suite.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Index},
    {path: '/config/:apiKey', component: ApiConfig, props: true},
    {path: '/test/:apiKey', component: ApiTest, props: true},
    {path: '/suites/:suiteKey', component: Suite, props: true}
  ]
})

new Vue({
  router,
  template: '<App/>',
  components: {App}
}).$mount('#app')
