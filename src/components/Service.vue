<template>
  <div clsss="row">
    <div class="col-md-4">
      <HostList :hosts="service.hosts"/>
      <ApiList :apis="service.apis"/>
    </div>
    <div class="col-md-8">
      <ResultList :results="results"/>
    </div>
  </div>
</template>

<script>
import HostList from './HostList.vue'
import ApiList from './ApiList.vue'
import ResultList from './ResultList.vue'

export default {
  components: {
    HostList, ApiList, ResultList
  },
  props: [
    'service', 'results'
  ]
}
</script>
