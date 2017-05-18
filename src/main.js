import Vue from 'vue'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
import VueClipboard from 'vue-clipboard2'
import App from './App.vue'

Vue.use(VueRouter)
Vue.use(VueFire)
Vue.use(VueClipboard)

import Index from './components/Index.vue'
import Service from './components/service/Service.vue'
import SuiteDetail from './components/suite_bak/SuiteDetail.vue'
import TestDetail from './components/test/TestDetail.vue'
import Settings from './components/settings/Settings.vue'

import Console from './components/console/Index.vue'
import Case from './components/case/Index.vue'
import Suite from './components/suite/Index.vue'
import Dashboard from './components/dashboard/Index.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Index},
    {path: '/services/:id', component: Service, props: true},
    {path: '/services/:serviceId/suites/:suiteId', component: SuiteDetail, props: true},
    {path: '/tests/:suiteId/:testId', component: TestDetail, props: true},
    {path: '/settings', component: Settings},
    {path: '/console', component: Console},
    {path: '/case', component: Case},
    {path: '/suite', component: Suite},
    {path: '/dashboard', component: Dashboard}
  ]
})

new Vue({
  router,
  template: '<App/>',
  components: {App}
}).$mount('#app')
