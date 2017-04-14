<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <strong>규격 목록</strong>
      <small>({{specs.length}})</small>
      <button class="btn btn-xs btn-primary pull-right" @click="create"><i class="fa fa-pencil-square-o"/> 등록</button>
    </div>
    <ul class="list-group">
      <SpecItem
        v-for="spec in specs"
        :key="spec['.key']"
        :spec="spec"
        :activeSpec="activeSpec"
        @detail="detail"
      />
    </ul>
  </div>
</template>

<script>
import SpecItem from './SpecItem.vue'

export default {
  props: ['specs', 'activeSpec'],
  components: {SpecItem},
  methods: {
    create () {
      this.$emit('create')
    },
    detail (spec) {
      this.$emit('detail', spec)
    }
  }
}
</script>
