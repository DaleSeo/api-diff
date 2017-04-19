<template>
  <div class="row">
    <div class="col-md-7">
      <ApiList
        :apis="apis" :activeApi="activeApi"
        @detail="detail" @create="create"
      />
    </div>
    <div class="col-md-5">
      <ApiForm v-if="activeApi['.key']"
        :api="activeApi"
        @reset="reset" @modify="modify" @remove="remove"
      />
    </div>
  </div>
</template>

<script>
import ApiList from './ApiList.vue'
import ApiForm from './ApiForm.vue'

import db from '../../services/database'

function getInitialData() {
  return {
    activeApi: {
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
  components: {ApiList, ApiForm},
  props: ['id'],
  firebase () {
    return {
      apis: db.ref('services/' + this.id).child('apis')
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
    detail (api) {
      console.log('#detail')
      this.activeApi = Object.assign({}, api)
    },
    create () {
      console.log('#create')
      this.reset()
      this.activeApi['.key'] = this.$firebaseRefs.apis.push().key
    },
    modify () {
      console.log('#modify')
      let api = Object.assign({}, this.activeApi)
      delete api['.key']
      if (api.text.trim()) {
        try {
          api.body = JSON.parse(api.text)
        } catch (err) {
          return window.alert(err)
        }
      } else {
        api.body = ''
      }
      this.$firebaseRefs.apis.child(this.activeApi['.key']).set(api)
    },
    remove () {
      console.log('#remove')
      this.$firebaseRefs.apis.child(this.activeApi['.key']).remove()
      this.reset()
    }
  }
}
</script>
