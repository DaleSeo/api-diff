<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <strong>응답</strong>
    </div>
    <div class="panel-body">
      <Progress v-if="inProgress"/>
      <div v-if="response.statusCode">
        <pre>{{response}}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import Progress from '../common/Progress.vue'

export default {
  components: {Progress},
  props: ['response', 'inProgress']
}
</script>
