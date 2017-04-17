<template>
  <div class="modal fade" :class="{in: show}" :style="style">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" @click="close">&times;</button>
          <h4 class="modal-title">응답 비교</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <b>호스트A</b>
              <pre>{{resA}}</pre>
            </div>
            <div class="col-sm-6">
              <b>호스트B</b>
              <pre>{{resB}}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['resA', 'resB', 'show'],
  computed: {
    style() {
      return this.show ? {display: 'block'} : {}
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
