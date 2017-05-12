<template>
  <div class="container">
    <h3><i class="fa fa-terminal"/> <b>Console</b> <small>콘솔</small></h3>
    <hr/>
    <div class="row">
      <div class="col-md-4">
        <ApiList />
      </div>
      <div class="col-md-8">
        <Request
          :request="request"
          @callApi="callApi"
        />
        <Response
          :response="response"
          :inProgress="inProgress"
        />
      </div>
    </div>
  </div>
</template>

<script>
import callApi from '../../services/callApi'

import ApiList from './ApiList.vue'
import Request from './Request.vue'
import Response from './Response.vue'

export default {
  components: {ApiList, Request, Response},
  data () {
    return {
      request: this.initRequest(),
      response: this.initResponse(),
      inProgress: false,
      loading: false
    }
  },
  methods: {
    initRequest () {
      return {
        method: 'GET',
        // queries: [],
        // headers: [],
        url: 'http://',
        body: ''
      }
    },
    initResponse () {
      return {
        statusCode: '',
        statusMessage: '',
        headers: {},
        body: ''
      }
    },
    callApi () {
      this.inProgress = true
      this.response = this.initResponse()
      callApi(this.request)
        .then(res => this.response = res)
        .catch(err => {
          console.error(err)
          toastr.error(err.response.body.message, '호출 실패')
        })
        .then(_ => this.inProgress = false)
    }
  }
}
</script>
