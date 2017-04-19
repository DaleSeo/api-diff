<template>
  <div class="container">
    <h3>서비스</h3>
    <hr/>
    {{id}}
  </div>
</template>

<script>
import db from '../../services/database'

export default {
  props: ['id'],
  firebase () {
    return {
      api: {
        source: db.ref('apis').child(this.id),
        asObject: true
      }
    }
  },
  data () {
    return {
      tab: 'specs',
    }
  }
}
</script>
