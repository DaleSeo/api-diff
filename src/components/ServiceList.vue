<template>
  <div class="row">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4>Service List</h4>
      </div>
      <div class="panel-body">
        <ul class="list-group">
          <li class="list-group-item" v-for="service in services" @click="select(service, $event)">
            {{service.title}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['services'],
  methods: {
    select (service, event) {
      console.log(event.target.className)
      event.target.className = "list-group-item active"
      this.$emit('select', service)
    }
  }
}
</script>
