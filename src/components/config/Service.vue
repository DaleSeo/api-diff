<template>
  <div clsss="row">
    <div class="page-header">
      <h2>{{service.title}}</h2>
    </div>
    <div class="col-md-6">
      <HostList id="hosts" :hosts="service.hosts"/>
    </div>
    <div class="col-md-6">
      <RequestList id="requests" :serviceKey="serviceKey"/>
    </div>
  </div>
</template>

<script>
import HostList from './HostList.vue'
import RequestList from './RequestList.vue'

import db from '../../services/database'

export default {
  components: {HostList, RequestList},
  props: ['serviceKey'],
  firebase () {
    return {
      service: {
        source: db.ref('services').child(this.serviceKey),
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
