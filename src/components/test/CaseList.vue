<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <strong>테스트 케이스 목록</strong>
      <small>({{cases.length}})</small>
    </div>
    <ul class="list-group">
      <CaseItem :cas="cas" :key="idx" v-for="(cas, idx) in cases"/>
    </ul>
  </div>
</template>

<script>
import CaseItem from './CaseItem.vue'

export default {
  props: ['cases'],
  components: {CaseItem}
}
</script>
