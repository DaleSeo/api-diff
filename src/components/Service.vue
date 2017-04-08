<template>
  <div clsss="row">
    <div class="col-md-4">
      <HostList :hosts="service.hosts"/>
      <ApiList :apis="service.apis"/>
    </div>
    <div class="col-md-8">
      <SuiteList :suites="suites"/>
    </div>
  </div>
</template>

<script>
import HostList from './HostList.vue'
import ApiList from './ApiList.vue'
import SuiteList from './SuiteList.vue'

export default {
  components: {
    HostList, ApiList, SuiteList
  },
  props: [
    'service', 'suites'
  ]
}
</script>
