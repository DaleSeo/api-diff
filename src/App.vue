<template>
  <div id="app" class="container">
    <PageHeader>API Diff</PageHeader>
    <div class="row">
      <div class="col-md-3">
        <Targets :targets="targets"/>
        <Apis :apis="apis"/>
      </div>
      <div class="col-md-9">
        <Results :results="results"/>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader.vue'
import Targets from './components/Targets.vue'
import Apis from './components/Apis.vue'
import Results from './components/Results.vue'

import targets from './data/targets.json'
import apis from './data/apis.json'

export default {
  name: 'app',
  components: {PageHeader, Targets, Apis, Results},
  data () {
    return {
      targets,
      apis,
      results: []
    }
  }
}
</script>

<style>
</style>
