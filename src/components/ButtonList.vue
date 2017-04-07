<template>
  <div class="row">
    <div class="pull-right">
      <button type="button" class="btn btn-default" @click="diff">Diff</button>
      <button type="button" class="btn btn-default" @click="config">Config</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['service'],
  methods: {
    diff() {
      let result = {
        serviceKey: this.service['.key'],
        date: Date(),
        responses: [
          {
            apiKey: 0,
            hostKey: 0,
            response: {
              userId: 1,
              id: 1,
              title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
              body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
            }
          },
          {
            apiKey: 0,
            hostKey: 1,
            response: {
              userId: 1,
              id: 1,
              title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
              body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
            }
          },
          {
            apiKey: 1,
            hostKey: 0,
            response: {
              id: 101,
              title: 'foo',
              body: 'bar',
              userId: 1
            }
          },
          {
            apiKey: 1,
            hostKey: 1,
            response: {
              id: 101,
              title: 'foo',
              body: 'bar',
              userId: 1
            }
          }
        ]
      }
      this.$emit('diff', result)
    },
    config() {
      window.alert('Not ready!')
    }
  }
}
</script>

<style scoped>
  .row {
    margin-bottom: 10px
  }
</style>
