import Vue from 'vue'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
import App from './App.vue'

Vue.use(VueRouter)
Vue.use(VueFire)

import Index from './components/Index.vue'
import Service from './components/service/Service.vue'
import SuiteDetail from './components/suite/SuiteDetail.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Index},
    {path: '/services/:id', component: Service, props: true},
    {path: '/suites/:id', component: SuiteDetail, props: true}
  ]
})

new Vue({
  router,
  template: '<App/>',
  components: {App}
}).$mount('#app')
