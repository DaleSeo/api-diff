<template>
  <div class="container">
    <h3>{{api.title}}</h3>
    <hr/>
    <div clsss="row">
      <div class="col-md-2">
        <ul class="nav nav-pills nav-stacked">
          <li :class="{active: tab === 'host'}" @click="tab = 'host'"><a href="#host">호스트</a></li>
          <li :class="{active: tab === 'api'}" @click="tab = 'api'"><a href="#api">API</a></li>
          <li :class="{active: tab === 'suite'}" @click="tab = 'suite'"><a href="#suite">테스트</a></li>
        </ul>
        <br/>
      </div>
      <div class="col-md-10">
        <Host id="host" v-if="tab === 'host'" :id="id"/>
        <Api id="api" v-if="tab === 'api'" :id="id"/>
        <Suite id="suite" v-if="tab === 'suite'" :id="id"/>
      </div>
    </div>
  </div>
</template>

<script>
import Host from '../host/Host.vue'
import Api from '../api/Api.vue'
import Suite from '../suite/Suite.vue'

import db from '../../services/database'

export default {
  props: ['id'],
  components: {Host, Api, Suite},
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
      tab: 'suite',
    }
  }
}
</script>
