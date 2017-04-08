<template>
  <div class="row">
    <div class="pull-right">
      <button type="button" class="btn btn-default" @click="diff">Diff</button>
      <button type="button" class="btn btn-default" @click="config">Config</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['service'],
  methods: {
    diff() {
      this.$emit('diff')
    },
    config() {
      window.alert('Not ready!')
    }
  }
}
</script>

<style scoped>
  .row {
    margin-bottom: 10px
  }
</style>
