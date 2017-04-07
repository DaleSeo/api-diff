<template>
  <div id="app" class="container">
    <PageHeader>API Diff</PageHeader>
    <div class="row">
      <div class="col-md-3">
        <Targets :targets="targets" @runTest="checkDiff"/>
        <Apis :apis="apis"/>
      </div>
      <div class="col-md-6">
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

import services from './data/services.json'
import apis from './data/apis.json'

import DiffChecker from './services/DiffChecker'
const diffChecker = new DiffChecker()

export default {
  name: 'app',
  components: {PageHeader, Targets, Apis, Results},
  data () {
    return {
      targets: services[0].hosts,
      apis,
      results: []
    }
  },
  methods: {
    checkDiff () {
      diffChecker.execute()
    }
  }
}
</script>

<style>
</style>
