<template>
  <div class="container">
    <h3>테스트 스위트 상세 - {{suite.title}}</h3>
    <hr/>
    <div class="text-right">
      <button class="btn btn-warning" @click="back">
        <i class="fa fa-list"/> 뒤로
      </button>
      <button class="btn btn-primary" @click="populateTests">
        <i class="fa fa-industry"/> 적재
      </button>
      <button class="btn btn-primary" @click="callTests">
        <i class="fa fa-play"/> 호출
      </button>
      <button class="btn btn-primary" @click="diff">
        <i class="fa fa-code"/> 검증
      </button>
      <button class="btn btn-danger" @click="del">
        <i class="fa fa-trash"/> 삭제
      </button>
    </div>
    <Test :id="suiteId" :hostA="suite.hostA" :hostB="suite.hostB"/>
  </div>
</template>

<script>
import Test from '../test/Test.vue'

import db from '../../services/database'
import SuiteService from '../../services/SuiteService'

let suiteService

import TestService from '../../services/TestService'
const testService = new TestService()

export default {
  props: ['serviceId', 'suiteId'],
  components: {Test},
  created () {
    suiteService = new SuiteService(this.serviceId)
  },
  data () {
    return {
      modal: false
    }
  },
  firebase () {
    return {
      suite: {
        source: db.ref(`services/${this.serviceId}/suites/${this.suiteId}`),
        asObject: true
      }
    }
  },
  methods: {
    back () {
      window.history.back()
    },
    populateTests () {
      console.log('#populateTests')
      suiteService.populateTests(this.suiteId)
        .then(_ => console.log('Done!'))
        .catch(err => console.error(err))
    },
    callTests () {
      console.log('#callTests')
      suiteService.callTests(this.suiteId)
        .then(_ => console.log('Done!'))
        .catch(err => console.error(err))
    },
    diff () {
      console.log('# diff')
      testService.diffSuite(this.suiteId)
    },
    del () {
      console.log('# del:', this.suiteId)
      suiteService.remove(this.suiteId)
      window.history.back()
    }
  }
}
</script>
