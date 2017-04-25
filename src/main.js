import Vue from 'vue'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
import App from './App.vue'

Vue.use(VueRouter)
Vue.use(VueFire)

import Index from './components/Index.vue'
import Service from './components/service/Service.vue'
import SuiteDetail from './components/suite/SuiteDetail.vue'
import TestDetail from './components/test/TestDetail.vue'
import Settings from './components/settings/Settings.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Index},
    {path: '/services/:id', component: Service, props: true},
    {path: '/services/:serviceId/suites/:suiteId', component: SuiteDetail, props: true},
    {path: '/tests/:suiteId/:testId', component: TestDetail, props: true},
    {path: '/settings', component: Settings}
  ]
})

new Vue({
  router,
  template: '<App/>',
  components: {App}
}).$mount('#app')
