<template>
  <table class="table table-striped table-hover">
    <caption>테스트 목록 ({{tests.length}})</caption>
    <thead>
      <tr>
        <th class="text-center" v-for="host in hosts">{{host}}</th>
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
      tests: db.ref('tests').orderByChild('suiteKey').equalTo(this.suiteKey)
    }
  }
}
</script>
