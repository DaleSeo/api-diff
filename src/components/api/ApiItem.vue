<template>
  <button class="list-group-item" :class="{active: active}" @click="detail">
    <h4 v-show="active">{{api.title}}</h4>
    <p class="list-group-item-heading">
      <span class="label" :class="className(api.method)">{{api.method}}</span>
      &nbsp;<em>{{api.url.slice(0, 50)}}</em>
    </p>
    <pre v-show="active && api.body" v-text="api.body"/>
  </button>
</template>

<script>
export default {
  props: ['api', 'activeApi'],
  computed: {
    active () {
      return this.api['.key'] === this.activeApi['.key']
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
      this.$emit('detail', this.api)
    }
  }
}
</script>
