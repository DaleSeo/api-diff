<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4>Targets</h4>
    </div>
    <div class="panel-body" @submit.prevent="runTest">
      <form class="form" v-if="services.length">
        <div class="form-group" v-for="target in services[0].hosts">
          <input type="text" class="form-control" v-model="target.baseUrl">
        </div>
        <button type="submit" class="btn btn-primary btn-block">Find Difference!</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['services'],
  methods: {
    runTest () {
      this.$emit('runTest')
    }
  }
}
</script>
