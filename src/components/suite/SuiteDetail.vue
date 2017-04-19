<template>
  <div class="container">
    <h3>테스트 스위트 상세 - {{suite.title}}</h3>
    <hr/>
    <div class="text-right">
      <button class="btn btn-warning" @click="back">
        <i class="fa fa-list"/> 뒤로
      </button>
      <button class="btn btn-primary" @click="load">
        <i class="fa fa-industry"/> 적재
      </button>
      <button class="btn btn-primary" @click="call">
        <i class="fa fa-play"/> 호출
      </button>
      <button class="btn btn-primary" @click="diff">
        <i class="fa fa-code"/> 검증
      </button>
      <button class="btn btn-danger" @click="del">
        <i class="fa fa-trash"/> 삭제
      </button>
    </div>
    <Test :id="id" :hostA="suite.hostA" :hostB="suite.hostB"/>
  </div>
</template>

<script>
import Test from '../test/Test.vue'
import db from '../../services/database'

import TestService from '../../services/TestService'
const testService = new TestService()

export default {
  props: ['id'],
  components: {Test},
  data () {
    return {
      modal: false
    }
  },
  firebase () {
    return {
      suite: {
        source: db.ref('suites/' + this.id),
        asObject: true
      }
    }
  },
  methods: {
    back () {
      window.history.back()
    },
    load () {
      console.log('# load')
      testService.loadSuite(this.id)
    },
    call () {
      console.log('# call')
      testService.callSuite(this.id)
    },
    diff () {
      console.log('# diff')
      testService.diffSuite(this.id)
    },
    del () {
      console.log('# del')
      testService.removeSuite(this.id)
      window.history.back()
    }
  }
}
</script>
