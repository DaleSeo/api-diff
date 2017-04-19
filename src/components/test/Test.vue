<template>
  <div>
    <TestList :id="id"/>
  </div>
</template>

<script>
import TestList from './TestList.vue'

export default {
  props: ['id', 'hostA', 'hostB'],
  components: {TestList}
}
</script>
