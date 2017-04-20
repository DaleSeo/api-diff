<template>
  <div class="container">
    <h3>
      <strong>테스트 상세</strong>
      <button class="btn btn-primary btn-sm pull-right" @click="back"><i class="fa fa-list"></i></button>
    </h3>
    <hr/>
    <TabSum :result="test.result" v-if="test.result"/>
    <br/>
    <div clsss="row">
      <ul class="nav nav-tabs">
        <li :class="{active: tab === 'req'}" @click="tab = 'req'"><a href="#req"><b>요청</b></a></li>
        <li :class="{active: tab === 'res'}" @click="tab = 'res'"><a href="#res"><b>응답</b></a></li>
      </ul>
    </div>
    <br/>
    <TabReq :reqA="test.reqA" :reqB="test.reqB" v-if="test.reqA && tab === 'req'"/>
    <TabRes :resA="test.resA" :resB="test.resB" v-if="test.reqB && tab === 'res'"/>
  </div>
</template>

<script>
import TabSum from './TabSum.vue'
import TabReq from './TabReq.vue'
import TabRes from './TabRes.vue'

import db from '../../services/database'

export default {
  props: ['suiteId', 'testId'],
  components: {TabSum, TabReq, TabRes},
  data () {
    return {
      tab: 'res'
    }
  },
  firebase () {
    return {
      test: {
        source: db.ref(`tests/${this.suiteId}/${this.testId}`),
        asObject: true
      }
    }
  },
  methods: {
    back () {
      window.history.back()
    }
  }
}
</script>
