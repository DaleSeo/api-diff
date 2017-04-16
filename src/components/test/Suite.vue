<template>
  <div class="container">
    <h3>{{suite.title}}</h3>
    <hr/>
    <div class="text-right">
      <button class="btn btn-primary">
        run
      </button>
    </div>
    <TestList :suiteKey="suiteKey" :hosts="suite.hosts"/>
  </div>
</template>

<script>
import TestList from './TestList.vue'

import db from '../../services/database'

export default {
  props: ['suiteKey'],
  components: {TestList},
  data () {
    return {
    }
  },
  firebase () {
    return {
      suite: {
        source: db.ref('suites/' + this.suiteKey),
        asObject: true
      }
    }
  },
}
</script>
