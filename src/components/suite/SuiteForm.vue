<template>
  <form @submit.prevent="add" @reset="hideForm">
    <div class="form-group">
      <label for="title">이름</label>
      <input id="title" type="text" class="form-control" v-model="suite.title"/>
    </div>
    <div class="form-group">
      <label for="hostA">호스트 A</label>
      <select id="hostA" class="form-control" v-model="suite.hostA">
        <option :value="host.baseUrl" v-for="host in hosts">{{host.baseUrl}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="hostB">호스트 B</label>
      <select id="hostB" class="form-control" v-model="suite.hostB">
        <option :value="host.baseUrl" v-for="host in hosts">{{host.baseUrl}}</option>
      </select>
    </div>
    <div class="form-group text-right">
      <button type="submit" class="btn btn-sm btn-primary">추가</button>
      <button type="reset" class="btn btn-sm btn-primary">취소</button>
    </div>
  </form>
</template>

<script>
export default {
  props: ['suite', 'hosts', 'form'],
  methods: {
    add () {
      this.$emit('add')
    },
    hideForm () {
      this.$emit('hideForm')
    }
  }
}
</script>
