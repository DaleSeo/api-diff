<template>
  <div class="panel panel-default">
    <pre>{{suite}}</pre>
    <div class="panel-heading">
      <strong>테스트 작업 목록</strong>
    </div>
    <div class="panel-body">
      <form @submit.prevent="add">
        <div class="form-group">
          <label for="title">이름</label>
          <input id="title" type="text" class="form-control" v-model="suite.title"/>
        </div>
        <div class="form-group">
          <label for="host1">호스트 #1</label>
          <select id="host1" class="form-control" v-model="suite.hosts[0]">
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </div>
        <div class="form-group">
          <label for="host2">호스트 #2</label>
          <select id="host2" class="form-control" v-model="suite.hosts[1]">
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </div>
        <div class="form-group text-right">
          <button type="submit" class="btn btn-sm btn-success"><i class="fa fa-plus"/> 추가</button>
        </div><!-- panel-footer -->
      </form>
    </div>
    <div class="panel-body">
      <div v-for="suite in suites">
        {{suite}}
      </div>
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
      suites: db.ref('suites')
    }
  },
  methods: {
    getInitialSuite () {
      return {
        date: Date(),
        title: '',
        apiKey: this.apiKey,
        status: '',
        hosts: [
          {title: '', baseUrl: ''},
          {title: '', baseUrl: ''}
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
