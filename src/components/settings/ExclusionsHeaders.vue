<template>
  <div class="panel panel-primary">
    <div class="panel-heading">
      <strong>헤더 전역 예외 항목</strong> <small v-if="exclusions">({{exclusions.length}})</small>
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="exclusion in exclusions">
        <span>{{exclusion}}</span>
        <button type="button" class="close" @click="del(exclusion)">&times;</button>
      </li>
    </ul>
    <div class="panel-footer">
      <div class="input-group">
        <input type="text" class="form-control input-sm" placeholder="추가할 예외 필드를 입력하세요." v-model="newExclusion" @keyup.enter="add"/>
        <span class="input-group-btn">
          <button class="btn btn-primary btn-sm" type="button" :disabled="disabled" @click="add">
            <i class="fa fa-pencil-square-o"/> 추가
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../../services/database'

export default {
  computed: {
    disabled () {
      return this.newExclusion.trim().length == 0
    },
    exclusions () {
      return this.exclustionsObj['.value'] || []
    }
  },
  data () {
    return {
      newExclusion: ''
    }
  },
  firebase () {
    return {
      exclustionsObj: {
        source: db.ref('settings/exclusions'),
        asObject: true
      }
    }
  },
  methods: {
    add () {
      if (this.disabled) return
      this.exclusions.push(this.newExclusion)
      this.$firebaseRefs.exclustionsObj.set(this.exclusions)
      this.newExclusion = ''
    },
    del (exclusion) {
      console.log(exclusion)
      let exclusions = this.exclusions.filter(e => e !== exclusion)
      console.log(exclusions)
      this.$firebaseRefs.exclustionsObj.set(exclusions)
    }
  }
}
</script>
