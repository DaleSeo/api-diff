<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <strong>요청 목록</strong>
      <button class="btn btn-xs btn-primary pull-right" @click="create"><i class="fa fa-pencil-square-o"/> 등록</button>
    </div>
    <ul class="list-group">
      <RequestItem
        v-for="request in requests"
        :key="request['.key']"
        :request="request"
        :activeRequest="activeRequest"
        @detail="detail"
      />
    </ul>
  </div>
</template>

<script>
import RequestItem from './RequestItem.vue'

export default {
  props: ['requests', 'activeRequest'],
  components: {RequestItem},
  methods: {
    create () {
      this.$emit('create')
    },
    detail (request) {
      this.$emit('detail', request)
    }
  }
}
</script>
