<template>
  <div id="app" class="container">
    <PageHeader>API Diff</PageHeader>
    <ServiceList :services="services" @select="selectService"/>
    <ButtonList v-if="service" :service="service" @createSuite="createSuite"/>
    <Service v-if="service" :service="service" :suites="suites"/>
  </div>
</template>

<script>
import ButtonList from './components/ButtonList.vue'
import PageHeader from './components/PageHeader.vue'
import ServiceList from './components/ServiceList.vue'
import Service from './components/Service.vue'

import db from './services/database'
import DiffChecker from './services/DiffChecker'
const diffChecker = new DiffChecker()

export default {
  name: 'app',
  components: {
    ButtonList, PageHeader, ServiceList, Service
  },
  firebase: {
    services: db.ref('services'),
    suites: db.ref('suites').limitToLast(10)
  },
  data () {
    return {
      service: ''
    }
  },
  methods: {
    selectService (service) {
      console.log('slectService:', service)
      this.service = service
    },
    checkDiff () {
    },
    createSuite () {
      console.log('createSuite')
      let suite = {
        date: Date(),
        serviceKey: this.service['.key'],
        status: 'ToDo'
      }
      this.$firebaseRefs.suites.push(suite)
      // diffChecker.execute(this.service, _ => {
      //   window.alert('Done!')
      // })
    }
  }
}
</script>

<style>
</style>
