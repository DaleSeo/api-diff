<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4>Api List</h4>
    </div>
    <div class="panel-body">
      <ul class="list-group">
        <li class="list-group-item" v-for="api in apis">
          {{api.method}} {{api.path}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['apis']
}
</script>
