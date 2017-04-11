<template>
  <div class="container">
    <h3>{{api.title}}</h3>
    <hr/>
    <div clsss="row">
      <div class="col-md-6">
        <HostList :apiKey="apiKey"/>
      </div>
      <div class="col-md-6">
        <RequestList :apiKey="apiKey"/>
      </div>
    </div>
  </div>
</template>

<script>
import HostList from './HostList.vue'
import RequestList from './RequestList.vue'

import db from '../../services/database'

export default {
  components: {HostList, RequestList},
  props: ['apiKey'],
  firebase () {
    return {
      api: {
        source: db.ref('apis').child(this.apiKey),
        asObject: true
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>
