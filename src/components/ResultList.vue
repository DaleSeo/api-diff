<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4>Result List</h4>
    </div>
    <div class="panel-body">
      <div class="well" v-if="results.length">{{results[0]}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['results']
}
</script>
