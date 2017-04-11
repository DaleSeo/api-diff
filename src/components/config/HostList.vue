<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      Hosts
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="host in hosts">
        {{host['.value']}}
      </li>
    </ul>
    <div class="panel-body">
      <form @submit.prevent="add(newHost)">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="http:// 또는 https:// 로 시작할 것" v-model="newHost"/>
          <span class="input-group-btn">
            <button type="submit" class="btn btn-default">추가</button>
          </span>
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
      newHost: ''
    }
  },
  methods: {
    add (host) {
      console.log('# add to ', this.$firebaseRefs.hosts.toString())
      this.$firebaseRefs.hosts.push(host)
      this.newHost = ''
    }
  }
}
</script>
