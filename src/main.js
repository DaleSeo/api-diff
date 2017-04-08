import Vue from 'vue'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
import App from './App.vue'
import Suite from './Suite.vue'

Vue.use(VueRouter)
Vue.use(VueFire)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: App},
    {path: '/suites/:id', component: Suite, props: true}
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <router-view></router-view>
    </div>
  `
}).$mount('#app')
