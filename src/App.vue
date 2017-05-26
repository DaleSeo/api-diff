<template>
  <div>
    <Header1/>
    <br/>
    <router-view></router-view>
    <br/>
    <Footer1/>
  </div>
</template>

<script>
import Header1 from './components/Header.vue'
import Footer1 from './components/Footer.vue'

export default {
  components: { Header1, Footer1 }
}
</script>
