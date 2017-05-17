<template>
  <div class="container">
    <h3><i class="fa fa-terminal"/> <b>Console</b> <small>콘솔</small></h3>
    <hr/>
    <div class="row">
      <div class="col-md-4">
        <ApiList
          @pickApi="pickApi"
        />
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
import serviceSvc from '../../services/serviceSvc'

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
        queries: [],
        headers: [
          {key: 'Accept', value: 'application/json;charset=UTF-8'},
          {key: 'Content-type', value: 'application/json;charset=UTF-8'}
        ],
        url: 'http://jsonplaceholder.typicode.com/posts/1',
        body: ''
      }
    },
    initResponse () {
      return {
        statusCode: '',
        statusMessage: '',
        headers: {},
        body: '',
        error: ''
      }
    },
    callApi () {
      this.inProgress = true
      this.response = this.initResponse()
      callApi(this.request)
        .then(res => this.response = res)
        .catch(err => {
          console.log(err)
          this.response.error = err.response.body.message
        })
        .then(_ => this.inProgress = false)
    },
    pickApi (api) {
      console.log('Index.vue#pickApi()', api)
      this.request.method = api.method
      this.request.url = api.url
      this.request.body = api.body
      this.response = this.initResponse
    }
  }
}
</script>
