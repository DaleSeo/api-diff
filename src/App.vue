<template>
  <div id="app" class="container">
    <PageHeader>API Diff</PageHeader>
    <div class="row">
      <div class="col-md-3">
        <Targets :services="services" @runTest="checkDiff"/>
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

import db from './services/database'
import DiffChecker from './services/DiffChecker'
const diffChecker = new DiffChecker()

export default {
  name: 'app',
  components: {PageHeader, Targets, Apis, Results},
  firebase: {
    services: db.ref('services'),
    apis: db.ref('apis'),
    results: db.ref('results')
  },
  data () {
    return {
      services: db.ref('services'),
      apis: db.ref('apis'),
      results: db.ref('results')
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
