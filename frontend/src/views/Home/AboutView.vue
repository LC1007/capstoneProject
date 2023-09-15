<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row my-5">
        <div class="col-sm-12 col-lg-5">
          <img
            src="https://images.unsplash.com/photo-1542715339-83599a9f0432?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"
            class="w-100 mb-sm-5" alt="">
        </div>
        <div class="col-sm-12 col-lg-5">
          <h1 class="w-100 text-center display-6">About The BMX World</h1>
          <p>Welcome to BMX Mania - Your One-Stop BMX Shop!

            Are you ready to unleash your inner daredevil and hit the tracks with style? At BMX Mania, we live and breathe
            BMX culture, and we're here to provide you with everything you need to shred the streets and dominate the dirt.
            Whether you're a seasoned pro or just getting started, we've got the gear, accessories, and expertise to fuel
            your BMX passion.</p>
          
          <p>So, what are you waiting for? Dive into our BMX wonderland and gear up for the ride of your life! Whether you're
            aiming for big air, mastering tricks, or conquering the track, BMX Mania has everything you need to take your
            BMX experience to the next level. Get ready to ride, shred, and conquer with BMX Mania!</p>
        </div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1587643084149-11de299d74bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" class="custom-img mb-5" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/HomeComponents/NavbarComp.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    Navbar
  },
  methods: {
    ...mapActions('products', ['fetchBikes'])
  },
  created() {
    this.fetchBikes()
  }
}
</script>

<style scoped>

img{
  display: block;
  max-width: 100%;
}

.custom-img{
  aspect-ratio: 21 / 9;
  object-fit: cover;
  width: 100vw;
}

</style>>


