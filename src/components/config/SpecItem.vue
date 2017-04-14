<template>
  <button class="list-group-item" :class="{active: active}" @click="detail">
    <h4 v-show="active">{{spec.title}}</h4>
    <p class="list-group-item-heading">
      <span class="label" :class="className(spec.method)">{{spec.method}}</span>
      &nbsp;<em>{{spec.url}}</em>
    </p>
    <pre v-show="active && spec.body" v-text="spec.body"/>
  </button>
</template>

<script>
export default {
  props: ['spec', 'activeSpec'],
  computed: {
    active () {
      return this.spec['.key'] === this.activeSpec['.key']
    }
  },
  methods: {
    className (method) {
      switch (method) {
        case 'GET': return 'label-success'
        case 'POST': return 'label-info'
        case 'PUT': return 'label-warning'
        case 'DELETE': return 'label-danger'
        default: return 'label-primary'
      }
    },
    detail () {
      this.$emit('detail', this.spec)
    }
  }
}
</script>
