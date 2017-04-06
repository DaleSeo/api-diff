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

export default {
  name: 'app',
  components: {PageHeader, Targets, Apis, Results},
  data () {
    return {
      targets: [
        {
          "name": "JSONPlaceholder #1",
          "baseUrl": "http://jsonplaceholder.typicode.com"
        },
        {
          "name": "JSONPlaceholder #2",
          "baseUrl": "http://jsonplaceholder.typicode.com"
        }
      ],
      apis: [
        {
          "method": "GET",
          "path": "/posts/1"
        },
        {
          "method": "POST",
          "path": "/posts",
          "body": {
            title: 'foo',
            body: 'bar',
            userId: 1
          }
        }
      ],
      results: []
    }
  }
}
</script>

<style>
</style>
