<template>
  <div class="row">
    <div class="col-md-7">
      <RequestList
        :requests="requests" :activeRequest="activeRequest"
        @create="create" @remove="remove" @detail="detail"
      />
    </div>
    <div class="col-md-5">
      <RequestForm v-if="activeRequest['.key']"
        :request="activeRequest"
        @modify="modify" @detail="detail"
      />
    </div>
  </div>
</template>

<script>
import RequestList from './RequestList.vue'
import RequestForm from './RequestForm.vue'

import db from '../../services/database'

export default {
  components: {RequestList, RequestForm},
  props: ['apiKey'],
  firebase () {
    return {
      requests: db.ref('apis/' + this.apiKey).child('requests')
    }
  },
  data () {
    return {
      activeRequest: {
        '.key': '',
        method: 'GET',
        url: '',
        text: '',
        description: '',
        ignoreKeys: ['date', 'time'],
        skip: false
      }
    }
  },
  methods: {
    className (method) {
      switch (method) {
        case 'GET': return 'label-success'
        case 'POST': return 'label-info'
        case 'PUT': return 'label-warning'
        case 'DELETE': return 'label-danger'
        default: return 'label-primary'
      }
    },
    detail (request) {
      console.log('#detail')
      this.activeRequest = request
      if (!this.activeRequest.ignoreKeys) {
        this.activeRequest.ignoreKeys = []
      }
    },
    create () {
      console.log('#create')
      this.activeRequest = {}
      this.$set(this.activeRequest, '.key', this.$firebaseRefs.requests.push().key)
    },
    modify () {
      console.log('#modify')
      let key = this.activeRequest['.key']
      console.log('key:', key)
      delete this.activeRequest['.key']
      console.log('data:', this.activeRequest)
      this.$firebaseRefs.requests.child(key).set(this.activeRequest)
      this.activeRequest = {}
    },
    remove (request) {
      console.log('#remove')
      this.$firebaseRefs.requests.child(request['.key']).remove()
    }
  }
}
</script>
