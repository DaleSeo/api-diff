<template>
  <div class="container">
    <h3>{{suite.title}}</h3>
    <hr/>
    <div class="text-right">
      <button class="btn btn-primary" @click="call">
        <i class="fa fa-play"/> 호출
      </button>
      <button class="btn btn-primary" @click="diff">
        <i class="fa fa-code"/> 비교
      </button>
    </div>
    <TestList :suiteKey="suiteKey" :hosts="suite.hosts" @show/>
  </div>
</template>

<script>
import TestList from './TestList.vue'
import db from '../../services/database'

import TestService from '../../services/TestService'
const testService = new TestService()

export default {
  props: ['suiteKey'],
  components: {TestList},
  data () {
    return {
      modal: false
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
  methods: {
    call () {
      testService.callSuite(this.suiteKey)
    },
    diff () {
      testService.diffSuite(this.suiteKey)
    }
  }
}
</script>
