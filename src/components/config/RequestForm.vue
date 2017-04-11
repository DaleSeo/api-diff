<template>
    <form @submit.prevent="create">
      <div class="form-group">
        <label for="method">Method</label>
        <select id="method" class="form-control" v-model="request.method">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
      </div>
      <div class="form-group">
        <label for="url">Path</label>
        <input id="url" type="text" class="form-control" v-model="request.url"/>
      </div>
      <div class="form-group">
        <label for="text">Body</label>
        <textarea id="text" class="form-control" rows="3" v-model="request.text"/>
      </div>
      <div class="text-right">
        <div class="btn-group">
          <button type="submit" class="btn btn-primary"><i class="fa fa-paper-plane"></i> Add</button>
          <button type="button" class="btn btn-default"><i class="fa fa-undo"></i> Cancel</button>
        </div>
      </div>
    </form>
</template>

<script>
export default {
  data () {
    return {
      request: {
        method: 'GET',
        url: 'http://jsonplaceholder.typicode.com/posts/1',
        text: ''
      }
    }
  },
  methods: {
    create () {
      if (this.request.text.trim()) {
        try {
          this.request.body = JSON.parse(this.request.text)
        } catch (err) {
          return window.alert(err)
        }
      }
      this.$emit('create', this.request)
    }
  }
}
</script>
