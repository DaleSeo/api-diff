<template>
  <div class="container">
    <h3>테스트 상세</h3>
    <hr/>
    <div clsss="row">
      <ul class="nav nav-tabs">
        <li :class="{active: tab === 'sum'}" @click="tab = 'sum'"><a href="#sum">요약</a></li>
        <li :class="{active: tab === 'req'}" @click="tab = 'req'"><a href="#req">요청</a></li>
        <li :class="{active: tab === 'res'}" @click="tab = 'res'"><a href="#res">응답</a></li>
      </ul>
    </div>
    <TabSum :result="test.result" v-if="tab === 'sum'"/>
    <TabReq :reqA="test.reqA" :reqB="test.reqB" v-if="tab === 'req'"/>
    <TabRes :resA="test.resA" :resB="test.resB" v-if="tab === 'res'"/>
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
      tab: 'sum'
    }
  },
  firebase () {
    return {
      test: {
        source: db.ref(`tests/${this.suiteId}/${this.testId}`),
        asObject: true
      }
    }
  }
}
</script>
