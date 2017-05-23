<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <i class="fa fa-list"/> <strong>선택한 API</strong> <small>({{apis.length}})</small>
    </div>
    <ul class="list-group">
      <ApiItem
        v-for="api in apis"
        :key="api.id"
        :api="api"
        @pick="pick"
      />
    </ul>
  </div>
</template>

<script>
import _ from 'lodash'

import serviceSvc from '../../services/serviceSvc'
import hostSvc from '../../services/hostSvc'
import apiSvc from '../../services/apiSvc'

import ApiItem from './ApiItem.vue'

export default {
  components: {ApiItem},
  data () {
    return {
      apis: []
    }
  }
}
</script>
