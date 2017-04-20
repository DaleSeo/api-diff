<template>
  <div class="row">
    <div class="col-md-6">
      <pre>
        {{reqA}}
      </pre>
    </div>
    <div class="col-md-6">
      <pre>
        {{reqB}}
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  props: ['reqA', 'reqB']
}
</script>
