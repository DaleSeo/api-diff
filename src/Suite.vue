<template>
  <div class="container">
    <PageHeader>Suite</PageHeader>
    <div>{{id}}</div>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader.vue'

export default {
  props: [
    'id'
  ],
  components: {
    PageHeader
  },
  data () {
    return {
    }
  }
}
</script>
