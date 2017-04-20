<template>
  <div class="row">
    <div class="col-md-6">
      <pre>
        {{resA}}
      </pre>
    </div>
    <div class="col-md-6">
      <pre>
        {{resB}}
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  props: ['resA', 'resB']
}
</script>
