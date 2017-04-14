<template>
  <div class="container">
    <h3>{{api.title}} 설정</h3>
    <hr/>
    <div clsss="row">
      <div class="col-md-2">
        <ul class="nav nav-pills nav-stacked">
          <li :class="{active: tab === 'hosts'}" @click="tab = 'hosts'"><a href="#hosts">호스트</a></li>
          <li :class="{active: tab === 'specs'}" @click="tab = 'specs'"><a href="#specs">요청</a></li>
        </ul>
      </div>
      <div class="col-md-10">
        <HostList id="hosts" v-show="tab === 'hosts'" :apiKey="apiKey"/>
        <SpecConfig id="specs" v-show="tab === 'specs'" :apiKey="apiKey"/>
      </div>
    </div>
  </div>
</template>

<script>
import HostList from './HostList.vue'
import SpecConfig from './SpecConfig.vue'

import db from '../../services/database'

export default {
  components: {HostList, SpecConfig},
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
      tab: 'specs',
    }
  }
}
</script>
