<template>
  <div id="app" class="container">
    <PageHeader>API Diff</PageHeader>
    <ServiceList :services="services" @select="selectService"/>
    <Service v-if="service" :service="service"/>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader.vue'
import ServiceList from './components/ServiceList.vue'
import Service from './components/Service.vue'

import db from './services/database'
import DiffChecker from './services/DiffChecker'
const diffChecker = new DiffChecker()

export default {
  name: 'app',
  components: {
    PageHeader, ServiceList, Service
  },
  firebase: {
    services: db.ref('services')
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
      diffChecker.execute()
    }
  }
}
</script>

<style>
</style>
