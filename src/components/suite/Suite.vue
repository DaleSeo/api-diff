<template>
  <div>
    <SuiteList :suites="suites" :form="form" @showForm="form = true"/>
    <SuiteForm :suite="suite" :hosts="hosts" @add="add" @hideForm="form = false" v-if="form"/>
  </div>
</template>

<script>
import SuiteList from './SuiteList.vue'
import SuiteForm from './SuiteForm.vue'

import db from '../../services/database'

import TestService from '../../services/TestService'
const testService = new TestService()

export default {
  props: ['id'],
  components: {SuiteList, SuiteForm},
  data () {
    return {
      form: false,
      suite: this.getInitialSuite()
    }
  },
  firebase () {
    return {
      suites: db.ref('suites').orderByChild('apiKey').equalTo(this.id),
      hosts: db.ref('apis/' + this.id).child('hosts')
    }
  },
  methods: {
    getInitialSuite () {
      return {
        date: null,
        title: '',
        apiKey: this.id,
        completed: false,
        hostA: '',
        hostB: ''
      }
    },
    add () {
      console.log('# add')
      testService.createSuite(this.suite)
      this.suite = this.getInitialSuite()
    }
  }
}
</script>
