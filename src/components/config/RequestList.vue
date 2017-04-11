<template>
  <ul class="list-group">
    <li class="list-group-item" v-for="request in requests">
      <p class="list-group-item-heading">
        <span class="label" :class="className(request.method)">{{request.method}}</span>
        &nbsp;<em @click="select(request)">{{request.url}}</em>
        <button class="close" @click="remove(request)">&times;</button>
      </p>
      <pre v-if="request.body" v-text="request.body"/>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['requests'],
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
    remove (request) {
      this.$emit('remove')
    }
  }
}
</script>
