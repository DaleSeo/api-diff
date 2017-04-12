<template>
  <div>
    <Navbar/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
@import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
body {
  font-family: 'Nanum Gothic', sans-serif;
}
</style>
