<template>
  <tr :class="{active: active}" @click="toggle">
    <td v-for="call in test.calls">
      <span class="label" :class="className(call.req.method)">{{call.req.method}}</span>
      &nbsp;<em>{{call.req.url}}</em>
      <!-- <b>{{call.res.statusCode}} {{call.res.statusText}}</b> -->
      <pre v-show="active && call.req.body" v-text="call.req.body"/>
      <!-- <pre v-show="active && test.res.body" v-text="test.res.body"/> -->
    </td>
  </tr>
</template>

<script>
export default {
  props: ['test'],
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
