<template>
  <div id="app" class="container">
    <PageHeader>API Diff</PageHeader>
    <ServiceList :services="services" @select="selectService"/>
    <ButtonList v-if="service" :service="service" @diff="pushResult"/>
    <Service v-if="service" :service="service" :results="results"/>
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
    results: db.ref('results')
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
    pushResult () {
      console.log('pushResult')
      diffChecker.execute(this.service, result => {
        console.log('result:', result)
        db.ref('results').remove()
        db.ref('results').push(result)
      })
    }
  }
}
</script>

<style>
</style>
