<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <strong>테스트 스위트 목록</strong> <small>({{suites.length}})</small>
      <button class="btn btn-xs btn-primary pull-right" @click="showForm" v-if="!form"><i class="fa fa-plus"/></button>
    </div>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>이름</th>
          <th>호스트</th>
          <th>요청 시간</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="suite['.key']" v-for="suite in suites" @click="pick(suite['.key'])">
          <td>{{suite.title}}</td>
          <td>
            {{suite.hostA}}
            <br>
            {{suite.hostB}}
          </td>
          <td>{{suite.date | formatDate}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['suites', 'serviceId', 'form'],
  filters: {
    formatDate (date) {
      return moment(date).format('YY/MM/DD HH:mm:ss')
    }
  },
  methods: {
    showForm () {
      this.$emit('showForm')
    },
    pick (key) {
      window.location.href = `/services/${this.serviceId}/suites/${key}`
    }
  }
}
</script>
