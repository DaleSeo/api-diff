<template>
  <div class="row">
    <div class="col-md-7">
      <RequestList
        :requests="requests" :activeRequest="activeRequest"
        @detail="detail" @create="create"
      />
    </div>
    <div class="col-md-5">
      <RequestForm v-if="activeRequest['.key']"
        :request="activeRequest"
        @reset="reset" @modify="modify" @remove="remove"
      />
    </div>
  </div>
</template>

<script>
import RequestList from './RequestList.vue'
import RequestForm from './RequestForm.vue'

import db from '../../services/database'

function getInitialData() {
  return {
    activeRequest: {
      '.key': '',
      title: '',
      method: 'GET',
      url: '',
      text: '',
      body: '',
      description: '',
      exclusion: '',
      skip: false
    }
  }
}

export default {
  components: {RequestList, RequestForm},
  props: ['apiKey'],
  firebase () {
    return {
      requests: db.ref('apis/' + this.apiKey).child('requests')
    }
  },
  data () {
    return getInitialData()
  },
  methods: {
    reset () {
      console.log('#reset')
      Object.assign(this.$data, getInitialData())
    },
    detail (request) {
      console.log('#detail')
      this.activeRequest = Object.assign({}, request)
    },
    create () {
      console.log('#create')
      this.reset()
      this.activeRequest['.key'] = this.$firebaseRefs.requests.push().key
    },
    modify () {
      console.log('#modify')
      let request = Object.assign({}, this.activeRequest)
      delete request['.key']
      if (request.text.trim()) {
        try {
          request.body = JSON.parse(request.text)
        } catch (err) {
          return window.alert(err)
        }
      } else {
        request.body = ''
      }
      this.$firebaseRefs.requests.child(this.activeRequest['.key']).set(request)
    },
    remove () {
      console.log('#remove')
      this.$firebaseRefs.requests.child(this.activeRequest['.key']).remove()
      this.reset()
    }
  }
}
</script>
