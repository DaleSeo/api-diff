<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <strong>테스트 요청 목록</strong>
    </div>
    <ul class="list-group">
      <router-link :to="`/test/${apiKey}/${suite['.key']}`" class="list-group-item" v-for="suite in suites">
        {{suite.title}} by {{suite.username}}
      </router-link>
    </ul>
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
          <label for="host1">호스트 #1</label>
          <select id="host1" class="form-control" v-model="suite.hosts[0]">
            <option :value="host.baseUrl" v-for="host in hosts">{{host.baseUrl}}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="host2">호스트 #2</label>
          <select id="host2" class="form-control" v-model="suite.hosts[1]">
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
import db from '../../services/database'

export default {
  props: ['apiKey'],
  data () {
    return {
      suite: this.getInitialSuite()
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
        date: Date(),
        title: '',
        username: '',
        apiKey: this.apiKey,
        completed: false,
        hosts: [
          {'.key': '', title: '', baseUrl: ''},
          {'.key': '', title: '', baseUrl: ''}
        ]
      }
    },
    add () {
      console.log('# add')
      this.suite.date = Date()
      this.$firebaseRefs.suites.push(this.suite)
      this.suite = this.getInitialSuite()
    }
  }
}
</script>
