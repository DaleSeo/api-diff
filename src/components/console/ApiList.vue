<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <i class="fa fa-list"/> <strong>API</strong> <small>({{apis.length}})</small>
    </div>
    <div class="panel-body">
      <select class="form-control" v-model="serviceId">
        <option value="">서비스를 선택하세요</option>
        <option :value="service.id" v-for="service in services">{{service.name}}</option>
      </select>
    </div>
    <ul class="list-group">
      <ApiItem
        v-for="api in apis"
        :key="api.id"
        :api="api"
      />
    </ul>
  </div>
</template>

<script>
import serviceSvc from '../../services/serviceSvc'
import apiSvc from '../../services/apiSvc'

import ApiItem from './ApiItem.vue'

export default {
  components: {ApiItem},
  data () {
    return {
      serviceId: '',
      services: [],
      apis: []
    }
  },
  watch: {
    serviceId (newVal) {
      this.listApis()
    }
  },
  created () {
    this.listServices()
    this.listApis()
  },
  methods: {
    listApis () {
      console.log('ApiList.vue#listApis')
      apiSvc.list(this.serviceId)
        .then(apis => this.apis = apis)
        .catch(err => {
          console.error(err)
          toastr.error('API 목록 조회 실패')
        })
    },
    listServices () {
      console.log('ApiList.vue#listServices()')
      serviceSvc.list()
        .then(services => this.services = services)
        .catch(err => toastr.error('서비스 목록 조회 실패'))
    },
    pick (id) {
      console.log('ApiList.vue#pick')

    }
  }

}
</script>
