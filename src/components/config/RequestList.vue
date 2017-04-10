<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item" v-for="request in requests">
        <h5 class="list-group-item-heading">
          <span class="label" :class="className(request.method)">{{request.method}}</span>
          &nbsp;<em @click="select(call)">{{request.url}}</em>
          <button class="close" @click="remove(call)">&times;</button>
        </h5>
        <p class="list-group-item-text">
          {{request.body}}
        </p>
      </li>
    </ul>
    <RequestForm :request="request" @create="create"/>
  </div>
</template>

<script>
import RequestForm from './RequestForm.vue'

import db from '../../services/database'

export default {
  components: {RequestForm},
  props: ['serviceKey'],
  firebase () {
    return {
      requests: db.ref('services/' + this.serviceKey).child('requests')
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
