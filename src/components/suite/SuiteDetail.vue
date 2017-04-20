<template>
  <div class="container">
    <h3>테스트 스위트 상세 - {{suite.title}}</h3>
    <hr/>
    <div class="text-right">
      <button class="btn btn-warning" @click="back">
        <i class="fa fa-list"/> 뒤로
      </button>
      <button class="btn btn-primary" @click="prepTests">
        <i class="fa fa-industry"/> 적재
      </button>
      <button class="btn btn-primary" @click="callTests">
        <i class="fa fa-play"/> 호출
      </button>
      <button class="btn btn-primary" @click="diffTests">
        <i class="fa fa-code"/> 검증
      </button>
      <button class="btn btn-danger" @click="del">
        <i class="fa fa-trash"/> 삭제
      </button>
    </div>
    <Test :suiteId="suiteId" :hostA="suite.hostA" :hostB="suite.hostB"/>
  </div>
</template>

<script>
import Test from '../test/Test.vue'

import db from '../../services/database'
import SuiteService from '../../services/SuiteService'
import TestService from '../../services/TestService'

let suiteService
let testService

export default {
  props: ['serviceId', 'suiteId'],
  components: {Test},
  created () {
    suiteService = new SuiteService(this.serviceId)
    testService = new TestService(this.suiteId)
  },
  data () {
    return {
      modal: false
    }
  },
  firebase () {
    return {
      suite: {
        source: db.ref(`tests/${this.serviceId}/${this.suiteId}`),
        asObject: true
      }
    }
  },
  methods: {
    back () {
      window.history.back()
    },
    prepTests () {
      console.log('#prepTests')
      suiteService.find(this.suiteId)
        .then(suite => testService.prep(suite))
        .then(_ => console.log('Done!'))
        .catch(err => console.error(err))
    },
    callTests () {
      console.log('#callTests')
      testService.call()
        .then(_ => console.log('Done!'))
        .catch(err => console.error(err))
    },
    diffTests () {
      console.log('#diffTests')
      testService.diff()
    },
    del () {
      console.log('# del:', this.suiteId)
      suiteService.remove(this.suiteId)
      window.history.back()
    }
  }
}
</script>
