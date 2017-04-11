<template>
  <div class="row">
    <div class="col-md-7">
      <RequestList :requests="requests" @remove="remove"/>
    </div>
    <div class="col-md-5">
      <RequestForm @create="create"/>
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
      showsForm: false
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
    create (request) {
      console.log('#create')
      this.$firebaseRefs.requests.push(request)
    },
    modify (request) {
      console.log('#modify')
      this.$firebaseRefs.requests.child(request['.key']).set(request)
    },
    remove (request) {
      console.log('#remove')
      this.$firebaseRefs.requests.child(request['.key']).remove()
    }
  }
}
</script>
