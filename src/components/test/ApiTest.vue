<template>
  <div class="container">
    <h3>{{api.title}} 검증</h3>
    <hr/>
    <div clsss="row">
      <SuiteList :apiKey="apiKey"/>
    </div>
  </div>
</template>

<script>
import SuiteList from './SuiteList.vue'

import db from '../../services/database'

export default {
  props: ['apiKey'],
  components: {SuiteList},
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
      tab: 'requests',
    }
  }
}
</script>
