<template>
  <div class="container">
    <h3>{{suite.title}}</h3>
    <hr/>
    <dt>시간</dt>
    <dd>{{suite.date}}</dd>
    <dt>요청자</dt>
    <dd>{{suite.username}}</dd>
    <dt>상태</dt>
    <dd>{{suite.completed}}</dd>
    <CaseList :cases="suite.cases"/>
  </div>
</template>

<script>
import CaseList from './CaseList.vue'

import db from '../../services/database'

export default {
  props: ['suiteKey'],
  components: {CaseList},
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
