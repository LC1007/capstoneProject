<template>
  <div>
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/HomeComponents/FooterComp.vue'
export default{
  components:{
    Footer
  }
}
</script>

<style>

</style>
