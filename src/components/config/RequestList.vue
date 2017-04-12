<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <strong>요청 목록</strong>
      <button class="btn btn-xs btn-primary pull-right" @click="create"><i class="fa fa-plus"/></button>
    </div>
    <ul class="list-group">
      <li
        class="list-group-item" :class="{active: request === activeRequest}"
        @click="detail(request)" v-for="request in requests"
      >
        <p class="list-group-item-heading">
          <span class="label" :class="className(request.method)">{{request.method}}</span>
          &nbsp;<em>{{request.url}}</em>
          <button class="close" @click="remove(request)">&times;</button>
        </p>
        <pre v-if="request.body" v-text="request.body"/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['requests', 'activeRequest'],
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
    create () {
      this.$emit('create')
    },
    detail (request) {
      this.$emit('detail', request)
    },
    remove (request) {
      this.$emit('remove')
    }
  }
}
</script>
