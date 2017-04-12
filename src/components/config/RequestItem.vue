<template>
  <li class="list-group-item" :class="{active: active}" @click="detail">
    <h4 v-show="active">{{request.title}}</h4>
    <p class="list-group-item-heading">
      <span class="label" :class="className(request.method)">{{request.method}}</span>
      &nbsp;<em>{{request.url}}</em>
    </p>
    <pre v-show="active && request.body" v-text="request.body"/>
  </li>
</template>

<script>
export default {
  props: ['request', 'activeRequest'],
  computed: {
    active () {
      return this.request['.key'] === this.activeRequest['.key']
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
      this.$emit('detail', this.request)
    }
  }
}
</script>
