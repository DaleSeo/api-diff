<template>
  <div class="container">
    <h3><i class="fa fa-cube"/> <b>Suite</b> <small>개별 검증</small></h3>
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
      calls: []
    }
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      callSvc.list()
        .then(calls => this.calls = calls)
    }
  }
}
</script>
