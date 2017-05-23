<template>
  <form @submit.prevent="save" @reset.prevent="reset">
    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <label for="title">검증 제목</label>
          <input id="title" type="text" class="form-control" required v-model="suite.title"/>
        </div>

        <div class="form-group">
          <label for="description">검증 설명</label>
          <textarea id="description" cols="3" class="form-control" required v-model="suite.description"/>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <ApiList/>
      </div>
      <div class="col-md-6">
        <SelectedApiList/>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-right">
        <button type="submit" class="btn btn-sm btn-success"><i class="fa fa-floppy-o"/> 저장</button>
        <button type="reset" class="btn btn-sm btn-warning"><i class="fa fa-undo"/> 취소</button>
      </div>
    </div>
  </form>
</template>

<script>
import ApiList from './ApiList.vue'
import SelectedApiList from './SelectedApiList.vue'

export default {
  components: { ApiList, SelectedApiList },
  data () {
    return {
      suite: {}
    }
  }
}
</script>
