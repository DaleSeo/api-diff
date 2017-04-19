<template>
  <div class="center-block" :style="{width: '500px'}">
    <div class="panel panel-default">
      <div class="panel-heading">
        API 서비스 목록 <small>({{services.length}})</small>
        <button class="btn btn-xs btn-primary pull-right" @click="showForm"><i class="fa fa-plus"/></button>
      </div>
      <ul class="list-group">
        <button class="list-group-item" @click="pick(service['.key'])" v-for="service in services">
          <div class="text-center"><strong>{{service.title}}</strong></div>
        </button>
      </ul>
    </div>
    <form @submit.prevent="add(newService)" v-if="form">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="서비스 이름을 영문으로 입력하세요." v-model="newService.title"/>
        <span class="input-group-btn">
          <button type="submit" class="btn btn-default">추가</button>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import db from '../../services/database'

export default {
  data () {
    return {
      form: false,
      newService: {
        title: ''
      }
    }
  },
  firebase() {
    return {
      services: db.ref('apis')
    }
  },
  methods: {
    showForm () {
      this.form = true
    },
    pick (id) {
      console.log('#pick:', id)
      this.$emit('pick', id)
    },
    add (service) {
      console.log('# add')
      this.$firebaseRefs.services.push(service)
      this.newService.title = ''
    }
  }
}
</script>
