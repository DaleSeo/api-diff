<template>
  <div clsss="row">
    <h2>API Config</h2>
    <hr/>

    <dl>
      <dt>ID</dt>
      <dd>{{service.id}}</dd>
      <dt>Title</dt>
      <dd>{{service.title}}</dd>
    </dl>

    <ul class="nav nav-tabs">
      <li :class="{active: tab === 'hosts'}"><a href="#hosts" @click="tab = 'hosts'">Hosts</a></li>
      <li :class="{active: tab === 'requests'}"><a href="#requests" @click="tab = 'requests'">Requests</a></li>
    </ul>

    <HostList id="hosts" :hosts="service.hosts" v-show="tab === 'hosts'"/>
    <RequestList id="requests" :serviceKey="serviceKey" v-show="tab === 'requests'"/>
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
      tab: 'hosts'
    }
  }
}
</script>
