<template>
  <div class="apiList center-block">
    <div class="panel panel-default">
      <div class="panel-heading">
        API 목록
      </div>
      <ul class="list-group">
        <li class="list-group-item" v-for="api in apis">
          <strong>{{api.title}}</strong>
          <div class="btn-group pull-right">
            <button class="btn btn-success btn-sm" @click="verify(api)"><i class="fa fa-play"></i></button>
            <router-link :to="'/config/' + api['.key']" class="btn btn-warning btn-sm"><i class="fa fa-cog"></i></router-link>
            <button class="btn btn-danger btn-sm" @click="del(api)"><i class="fa fa-trash"></i></button>
          </div>
        </li>
      </ul>
    </div>
    <form @submit.prevent="add(newApi)">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="API 이름을 영문으로 입력하세요." v-model="newApi.title"/>
        <span class="input-group-btn">
          <button type="submit" class="btn btn-default">추가</button>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import db from '../services/database'

export default {
  data () {
    return {
      newApi: {
        title: ''
      }
    }
  },
  firebase() {
    return {
      apis: db.ref('apis')
    }
  },
  methods: {
    verify (api) {
      console.log('# verify')
    },
    add (api) {
      console.log('# add')
      this.$firebaseRefs.apis.push(api)
      this.newApi.title = ''
    },
    del (api) {
      console.log('# del')
      window.alert('권한이 없습니다.')
    }
  }
}
</script>

<style scoped>
  .apiList {
    width: 500px;
  }
  .list-group-item {
    height: 50px;
  }
</style>
