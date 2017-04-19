<template>
  <div class="container">
    <Service v-if="id" :id="id"/>
    <ServiceList v-else @pick="pick"/>
  </div>
</template>

<script>
import ServiceList from './service/ServiceList.vue'
import Service from './service/Service.vue'

export default {
  components: {ServiceList, Service},
  data () {
    return {
      id: ''
    }
  },
  methods: {
    pick (id) {
      console.log('#pick:', id)
      this.id = id
    }
  }
}
</script>

<style>
</style>
