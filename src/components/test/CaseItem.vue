<template>
  <button class="list-group-item" :class="{active: active}" @click="toggle">
    <p class="list-group-item-heading">
      <span class="label" :class="className(cas.req.method)">{{cas.req.method}}</span>
      &nbsp;<em>{{cas.req.url}}</em>
      <b>{{cas.res.statusCode}} {{cas.res.statusText}}</b>
    </p>
    <pre v-show="active && cas.req.body" v-text="cas.req.body"/>
    <pre v-show="active && cas.res.body" v-text="cas.res.body"/>
  </button>
</template>

<script>
export default {
  props: ['cas'],
  data () {
    return {
      active: false
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
    toggle () {
      this.active = !this.active
    }
  }
}
</script>
