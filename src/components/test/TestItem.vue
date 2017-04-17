<template>
  <tr :class="{active: active}" @click="toggle">
    <td>
      <span class="label" :class="className(test.reqA.method)">{{test.reqA.method}}</span>
      &nbsp;<em>{{test.reqA.url}}</em>
      <!-- <b>{{call.res.statusCode}} {{call.res.statusText}}</b> -->
      <pre v-show="active && test.reqA.body" v-text="test.reqA.body"/>
      <!-- <pre v-show="active && test.res.body" v-text="test.res.body"/> -->
    </td>
    <td>
      <span class="label" :class="className(test.reqB.method)">{{test.reqB.method}}</span>
      &nbsp;<em>{{test.reqB.url}}</em>
      <!-- <b>{{call.res.statusCode}} {{call.res.statusText}}</b> -->
      <pre v-show="active && test.reqB.body" v-text="test.reqB.body"/>
      <!-- <pre v-show="active && test.res.body" v-text="test.res.body"/> -->
    </td>
    <td>
      {{status}}
    </td>
    <td>
      <span v-if="test.result">{{test.result}}</span>
      <span v-else>N/A</span>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['test'],
  computed: {
    status() {
      if (this.test.result) {
        return '비교 완료'
      }

      if (this.test.resA || this.test.errA) {
        return '호출 완료'
      }

      return '준비'
    }
  },
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
