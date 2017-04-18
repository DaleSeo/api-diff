<template>
  <table class="table table-hover">
    <caption>테스트 목록 ({{tests.length}})</caption>
    <thead>
      <tr>
        <th>호스트A</th>
        <th>호스트B</th>
        <th>상태</th>
        <th>결과</th>
      </tr>
    </thead>
    <tbody>
      <TestItem :test="test" :key="test['.key']" v-for="test in tests"/>
    </tbody>
  </table>
</template>

<script>
import TestItem from './TestItem.vue'

import db from '../../services/database'

export default {
  props: ['suiteKey', 'hosts'],
  components: {TestItem},
  firebase () {
    return {
      tests: db.ref('suites/' + this.suiteKey + '/tests')
    }
  }
}
</script>
