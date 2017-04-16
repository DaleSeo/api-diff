<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <strong>테스트 요청 목록</strong>
    </div>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>이름</th>
          <th>호스트 A</th>
          <th>호스트 B</th>
          <th>요청자</th>
          <th>요청 시간</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="suite['.key']" v-for="suite in suites">
          <td>{{suite.title}}</td>
          <td>{{suite.hosts[0]}}</td>
          <td>{{suite.hosts[1]}}</td>
          <td>{{suite.username}}</td>
          <td>{{suite.date | formatDate}}</td>
          <td>
            <router-link class="btn btn-primary btn-xs" :to="`/suites/${suite['.key']}`">
              <i class="fa fa-list"/>
            </router-link>
            <button class="btn btn-danger btn-xs">
              <i class="fa fa-trash"/>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="panel-body">
      <form @submit.prevent="add">
        <div class="form-group">
          <label for="title">이름</label>
          <input id="title" type="text" class="form-control" v-model="suite.title"/>
        </div>
        <div class="form-group">
          <label for="username">요청자</label>
          <input id="username" type="text" class="form-control" v-model="suite.username"/>
        </div>
        <div class="form-group">
          <label for="hostA">호스트 A</label>
          <select id="hostA" class="form-control" v-model="suite.hosts[0]">
            <option :value="host.baseUrl" v-for="host in hosts">{{host.baseUrl}}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="hostB">호스트 B</label>
          <select id="hostB" class="form-control" v-model="suite.hosts[1]">
            <option :value="host.baseUrl" v-for="host in hosts">{{host.baseUrl}}</option>
          </select>
        </div>
        <div class="form-group text-right">
          <button type="submit" class="btn btn-sm btn-success"><i class="fa fa-plus"/> 추가</button>
        </div><!-- panel-footer -->
      </form>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import db from '../../services/database'

export default {
  props: ['apiKey'],
  data () {
    return {
      suite: this.getInitialSuite()
    }
  },
  filters: {
    formatDate (date) {
      return moment(String(date)).format('YYYY/MM/DD hh:mm:ss a')
    }
  },
  firebase () {
    return {
      suites: db.ref('suites'),
      hosts: db.ref('apis/' + this.apiKey).child('hosts')
    }
  },
  methods: {
    getInitialSuite () {
      return {
        date: null,
        title: '',
        username: '',
        apiKey: this.apiKey,
        completed: false,
        hosts: ['', '']
      }
    },
    add () {
      console.log('# add')
      this.suite.date = Date().getTime()
      this.$firebaseRefs.suites.push(this.suite)
      this.suite = this.getInitialSuite()
    }
  }
}
</script>
