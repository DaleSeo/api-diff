<template>
  <form @submit.prevent="callApi" @reset="reset">
    <div class="panel panel-default">
      <div class="panel-heading">
        <strong>요청</strong>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-sm-3">
            <select class="form-control" v-model="request.method" required>
              <option v-for="method in methods">{{method}}</option>
            </select>
          </div>
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="request.url" required/>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <textarea id="text" class="form-control" rows="3" v-model="request.text"/>
          </div>
        </div>
        <div class="row text-right">
          <div class="col-sm-12">
            <button type="submit" class="btn btn-primary">호출</button>
            <button type="reset" class="btn btn-default">취소</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: ['request'],
  data () {
    return {
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  },
  methods: {
    callApi () {
      this.$emit('callApi')
    },
    reset () {
      alert('reset')
    }
  }
}
</script>

<style scoped>
.row {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
