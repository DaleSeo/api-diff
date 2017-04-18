<template>
  <tr :class="{active: active}">
    <td>
      <span class="label" :class="className(test.reqA.method)">{{test.reqA.method}}</span>
      &nbsp;<em>{{test.reqA.url}}</em>
      <pre v-show="active && test.reqA.body" v-text="test.reqA.body"/>
      <div v-if="active && test.resA">
        <hr/>
        <b>{{test.resA.statusCode}} {{test.resA.statusText}}</b>
        <pre v-show="active && test.resA.body" v-text="test.resA.body"/>
      </div>
    </td>
    <td>
      <span class="label" :class="className(test.reqB.method)">{{test.reqB.method}}</span>
      &nbsp;<em>{{test.reqB.url}}</em>
      <pre v-show="active && test.reqB.body" v-text="test.reqB.body"/>
      <div v-if="active && test.resB">
        <hr/>
        <b>{{test.resB.statusCode}} {{test.resB.statusText}}</b>
        <pre v-show="active && test.resB.body" v-text="test.resB.body"/>
      </div>
    </td>
    <td>
      {{status}}
    </td>
    <td>
      <span v-if="test.resA || test.resB">
        <button class="btn btn-primary btn-sm" @click="showDiff"><i class="fa fa-window-restore"/></button>
        <ResDiff :resA="test.resA" :resB="test.resB" :result="test.result" :show="diff" v-if="diff" @close="hideDiff"/>
        <div v-if="diff" class="modal-backdrop fade in"></div>
      </span>
    </td>
  </tr>
</template>

<script>
import ResDiff from './ResDiff.vue'

export default {
  props: ['test'],
  components: { ResDiff },
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
      active: false,
      diff: false
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
    },
    showDiff () {
      console.log('#showDiff')
      this.diff = true
    },
    hideDiff () {
      console.log('#hideDiff')
      this.diff = false
    }
  }
}
</script>
