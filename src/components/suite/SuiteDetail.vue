<template>
  <div class="container">
    <h3>
      <i class="fa fa-bar-chart"/> <b>{{suite.title}}</b>
      <div class="pull-right">
        <button class="btn btn-sm btn-warning" @click="list">
          <i class="fa fa-list"/>
        </button>
        <button class="btn btn-sm btn-danger" @click="del">
          <i class="fa fa-trash"/>
        </button>
      </div>
    </h3>
    <hr/>
    <blockquote>
      <button class="btn btn-info" @click="prepTests">
        <i class="fa fa-industry"/> 적재
      </button>
      <button class="btn btn-info" @click="callTests">
        <i class="fa fa-play"/> 호출
      </button>
      <button class="btn btn-info" @click="diffTests">
        <i class="fa fa-code"/> 비교
      </button>
      버튼을 차례로 클릭하여 검증을 수행하십시오.
    </blockquote>
    <Test :suiteId="suiteId"/>
  </div>
</template>

<script>
import Test from '../test/Test.vue'

import db from '../../services/database'
import SuiteService from '../../services/SuiteService'
import TestService from '../../services/TestService'

import moment from 'moment'

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
        source: db.ref(`/services/${this.serviceId}/suites/${this.suiteId}`),
        asObject: true
      }
    }
  },
  methods: {
    list () {
      window.location.href = `/services/${this.serviceId}`
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
      console.log('#del:', this.suiteId)
      suiteService.remove(this.suiteId)
      window.history.back()
    }
  }
}
</script>

<style scoped>
blockquote {
  font-size: 12pt;
}
</style>
