<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4>Host List</h4>
    </div>
    <div class="panel-body" @submit.prevent="runTest">
      <ul class="list-group">
        <li class="list-group-item" v-for="host in hosts">
          {{host.baseUrl}}
        </li>
      </ul>
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
