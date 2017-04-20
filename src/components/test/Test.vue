<template>
  <div>
    <TestList :suiteId="suiteId"/>
  </div>
</template>

<script>
import TestList from './TestList.vue'

export default {
  props: ['suiteId', 'hostA', 'hostB'],
  components: {TestList}
}
</script>
