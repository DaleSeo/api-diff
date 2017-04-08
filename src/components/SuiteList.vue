<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4>Suite List</h4>
    </div>
    <div class="panel-body">
      <div class="well" v-for="suite in suites">
        <router-link :to="'/suites/' + suite['.key']">{{suite['.key']}}</router-link>
        <br/>
        {{suite.date}}
      </div>
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  props: ['suites']
}
</script>
