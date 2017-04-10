<template>
  <div class="container">
    <PageHeader v-if="isList">Config</PageHeader>
    <Service v-if="service" :serviceKey="service['.key']"/>
    <ServiceList v-if="isList" :services="services" @select="selectService"/>
  </div>
</template>

<script>
import PageHeader from '../PageHeader.vue'
import ServiceList from '../ServiceList.vue'
import Service from './Service.vue'

import db from '../../services/database'

export default {
  props: ['id'],
  components: {PageHeader, ServiceList, Service},
  firebase: {
    services: db.ref('services')
  },
  computed: {
    isList () {
      return this.service === ''
    }
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
    }
  }
}
</script>

<style>
</style>
