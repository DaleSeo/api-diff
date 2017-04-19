<template>
  <div class="container">
    <h3>{{suite.title}}</h3>
    <hr/>
    <div class="text-right">
      <button class="btn btn-primary" @click="call">
        <i class="fa fa-industry"/> 구성
      </button>
      <button class="btn btn-primary" @click="call">
        <i class="fa fa-play"/> 호출
      </button>
      <button class="btn btn-primary" @click="diff">
        <i class="fa fa-code"/> 비교
      </button>
      <button class="btn btn-danger" @click="call">
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
    call () {
      testService.callSuite(this.id)
    },
    diff () {
      testService.diffSuite(this.id)
    }
  }
}
</script>
