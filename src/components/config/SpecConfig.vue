<template>
  <div class="row">
    <div class="col-md-7">
      <SpecList
        :specs="specs" :activeSpec="activeSpec"
        @detail="detail" @create="create"
      />
    </div>
    <div class="col-md-5">
      <SpecForm v-if="activeSpec['.key']"
        :spec="activeSpec"
        @reset="reset" @modify="modify" @remove="remove"
      />
    </div>
  </div>
</template>

<script>
import SpecList from './SpecList.vue'
import SpecForm from './SpecForm.vue'

import db from '../../services/database'

function getInitialData() {
  return {
    activeSpec: {
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
  components: {SpecList, SpecForm},
  props: ['apiKey'],
  firebase () {
    return {
      specs: db.ref('apis/' + this.apiKey).child('specs')
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
    detail (spec) {
      console.log('#detail')
      this.activeSpec = Object.assign({}, spec)
    },
    create () {
      console.log('#create')
      this.reset()
      this.activeSpec['.key'] = this.$firebaseRefs.specs.push().key
    },
    modify () {
      console.log('#modify')
      let spec = Object.assign({}, this.activeSpec)
      delete spec['.key']
      if (spec.text.trim()) {
        try {
          spec.body = JSON.parse(spec.text)
        } catch (err) {
          return window.alert(err)
        }
      } else {
        spec.body = ''
      }
      this.$firebaseRefs.specs.child(this.activeSpec['.key']).set(spec)
    },
    remove () {
      console.log('#remove')
      this.$firebaseRefs.specs.child(this.activeSpec['.key']).remove()
      this.reset()
    }
  }
}
</script>
