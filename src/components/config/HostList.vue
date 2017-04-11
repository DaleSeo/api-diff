<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      Hosts
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="host in hosts">
        <b>[{{host.title}}]</b> {{host.baseUrl}}
        <button class="close" @click="del(host)">&times;</button>
      </li>
    </ul>
    <div class="panel-body">
      <form @submit.prevent="add(newHost)">
        <div class="row">
          <div class="col-md-3">
            <input type="text" class="form-control" id="title" v-model="newHost.title" placeholder="이름">
          </div>
          <div class="col-md-7">
            <input type="text" class="form-control" id="baseUrl" v-model="newHost.baseUrl" placeholder="URL (http:// 또는 https:// 로 시작할 것)">
          </div>
          <div class="col-md-2">
            <button type="submit" class="btn btn-default">추가</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from '../../services/database'

export default {
  props: ['apiKey'],
  firebase () {
    return {
      hosts: db.ref('apis/' + this.apiKey).child('hosts')
    }
  },
  data () {
    return {
      newHost: {
        title: '',
        baseUrl: ''
      }
    }
  },
  methods: {
    add (host) {
      console.log('# add to ', this.$firebaseRefs.hosts.toString())
      console.log('host:', host)
      this.$firebaseRefs.hosts.push(host)
      this.newHost.title = ''
      this.newHost.baseUrl = ''
    },
    del (host) {
      console.log('# del to ', this.$firebaseRefs.hosts.toString())
      console.log('host:', host)
      this.$firebaseRefs.hosts.child(host['.key']).remove()
    }
  }
}
</script>
