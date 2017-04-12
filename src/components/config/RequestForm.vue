<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <strong>요청 상세</strong>
      <small>({{request['.key']}})</small>
    </div>
    <div class="panel-body">
      <form @submit.prevent="modify" @reset.prevent="cancel">
        <div class="form-group">
          <label for="method">메소드</label>
          <select id="method" class="form-control" v-model="request.method">
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </div>
        <div class="form-group">
          <label for="url">패스</label>
          <input id="url" type="text" class="form-control" v-model="request.url"/>
        </div>
        <div class="form-group">
          <label for="body">바디</label>
          <textarea id="body" class="form-control" rows="3" v-model="request.text"/>
        </div>
        <div class="form-group">
          <label for="description">설명</label>
          <textarea id="description" class="form-control" rows="3" v-model="request.description"/>
        </div>
        <div class="form-group">
          <label for="ignoreKeys">
            예외 필드{{request.ignoreKeys}}
            <button type="button" class="btn btn-xs btn-default" @click="addIgnoreKey">+</button>
          </label>
          <input id="ignoreKeys" class="form-control" v-model="request.ignoreKeys[index]" v-for="(value, index) in request.ignoreKeys"/>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="request.skip">검증 건더뛰기
          </label>
        </div>
        <div class="text-right">
          <div class="btn-group">
            <button type="submit" class="btn btn-primary"><i class="fa fa-floppy-o"/> Save</button>
            <button type="reset" class="btn btn-default"><i class="fa fa-undo"/> Reset</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['request'],
  methods: {
    modify () {
      if (this.request.text.trim()) {
        try {
          this.request.body = JSON.parse(this.request.text)
        } catch (err) {
          return window.alert(err)
        }
      }
      this.$emit('modify')
    },
    cancel () {
      this.$emit('detail', {})
    },
    addIgnoreKey () {
      this.request.ignoreKeys.push('')
    }
  }
}
</script>
