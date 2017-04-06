<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4>Targets</h4>
    </div>
    <div class="panel-body">
      <form class="form">
        <div class="form-group" v-for="target in targets">
          <input type="text" id="bookTitle" class="form-control" v-model="target.baseUrl">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['targets']
}
</script>
