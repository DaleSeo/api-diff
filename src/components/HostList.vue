<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4>Host List</h4>
    </div>
    <div class="panel-body" @submit.prevent="runTest">
      <div class="checkbox" v-for="host in hosts">
        <label>
          <input type="checkbox" value=""/>
          {{host.baseUrl}}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['hosts'],
  methods: {
    runTest () {
      this.$emit('runTest')
    }
  }
}
</script>
