<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <i class="fa fa-list"/> <strong>API</strong> <small>({{apis.length}})</small>
    </div>
    <ul class="list-group">
      <ApiItem
        v-for="api in apis"
        :key="api.id"
        :api="api"
      />
    </ul>
  </div>
</template>

<script>
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
