<template>
  <div class="container">
    <h3><i class="fa fa-cube"/> <b>Test Case</b> <small>검증 목록</small></h3>
    <hr/>
    <List :calls="calls"/>
  </div>
</template>
<script>
import callSvc from '../../services/callSvc'

import List from './List.vue'

export default {
  components: { List },
  data () {
    return {
      calls: [],
      id: ''
    }
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      callSvc.list(this.$route.query.suiteId)
        .then(calls => this.calls = calls)
    }
  }
}
</script>
