<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4>Result List</h4>
    </div>
    <div class="panel-body">
      <pre v-for="result in results" v-text="JSON.stringify(result, null, 2)">
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  props: ['results']
}
</script>
