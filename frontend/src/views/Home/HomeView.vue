<template>
  <div>
    <Navbar />
    <!-- Story time section -->
    <section>
      <h1 class="text-center m-5">STORYTIME</h1>
      <div class="container">
        <div class="row m-5">
          <div class="col-12 col-lg-6 col-md-6">
            <p>"Welcome to BMX WORLD, your premier online destination for all things BMX. Dive into a world of extreme sports excitement,  thrilling universe of BMX. Join us today and unleash your passion for pedal-powered adrenaline!"</p>
            <p>From jaw-dropping tricks and the latest gear to expert tips and a thriving BMX community. Whether you're a beginner or a seasoned rider, our website is your gateway to the</p>
          </div>
          <div class="col-12 col-lg-6 col-md-6">
            <img src="https://i.postimg.cc/sgJKsQkg/pexels-zach-service-922936.jpg" class="custom-square-img w-100" alt="">
          </div>
        </div>
      </div>
    </section>

    <!-- Top picks section -->

      <section>
        <h1 class="text-center my-5">TOP PICKS</h1>  
        <div class="container">
          <div class="row my-5 g-2" v-if="featuredBikes">
            <div class="col" v-for="bike in featuredBikes" :key="bike.bmxID">
              <div class="card m-auto" style="width: 18rem">
                <img :src="bike.prodUrl" class="card-img-top top-imgs" alt="">
                <div class="card-body">
                  <h4 class="card-tite">{{ bike.prodName }}</h4>
                  <p class="card-text">{{ bike.amount }}</p>
                  <router-link :to="'/product/' + bike.bmxID"><button class="btn btn-dark">View More</button></router-link>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="d-flex justify-content-center w-100">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    <!-- Events section -->

    <section>
      <h1 class="text-center m-5">EVENTS</h1>
      <div class="container">
        <div class="custom-grid">
          <div class="event-1">
            <img src="https://i.postimg.cc/bwq8dptX/yomex-owo-q-NJ-C49u-MH0-unsplash.jpg" class="w-100 custom-grid-img" alt="">
          </div>
          <div class="event-2">
            <img src="https://i.postimg.cc/cHdvLxHz/b-mat-an-gelo-t-YN9rm-SR24o-unsplash.jpg" class="w-100 custom-grid-img" alt="">
          </div>
          <div class="event-3">
            <img src="https://i.postimg.cc/Fz5pCJs6/rinke-dohmen-DC5-VX3awk-E-unsplash.jpg" class="w-100 custom-grid-img" alt="">
          </div>
          <div class="event-4">
            <img src="https://i.postimg.cc/nrKW4tfN/fachy-marin-0-HLGDvx-Vh8-E-unsplash.jpg" class="w-100 custom-grid-img" alt="">
          </div>
        </div>
      </div>
    </section>

    <!-- Only the best for the best section -->

    <section>
      <div class="container">
        <div class="row my-5">
          <div class="col-12 col-lg-6 col-md-6">
            <h1 class="display-1 fw-bold">ONLY THE BEST FOR THE BEST</h1>
            <p>Are you ready to embark on an adrenaline-fueled journey through the world of BMX? Look no further! Our BMX website is your one-stop destination for everything BMX-related. Whether you're a seasoned pro or just starting out, we've got you covered.</p>
            <button class="btn btn-dark">Buy now</button>
          </div>
          <div class="col-12 col-lg-6 col-md-6">
            <img src="https://i.postimg.cc/Vs76vTH8/62165db45515463e41aa6df4-crysis-champagne-2000-2.jpg" class="w-100"  alt="">
          </div>
        </div>
      </div>
    </section>
    
  </div>
</template>

<script>
import Navbar from '@/components/HomeComponents/NavbarComp.vue'
import { mapActions, mapState } from 'vuex'

export default{
  components:{
    Navbar
  },
  computed:{
    ...mapState('products', ['selectedBike', 'featuredBikes'])
  },
  mounted(){
    this.featuredProducts()
  },  
  methods:{
    ...mapActions('products', ['fetchBike', 'featuredProducts'])
  }
}
</script>

<style scoped>
.custom-square-img{
    aspect-ratio: 1 / 1;
    object-fit: cover;
}
.top-imgs{
    aspect-ratio: 1 / 1;
    object-fit: contain;
}

.custom-grid{
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  height: 100vh;
  gap: 2rem;
}

.custom-grid-img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-1{
  grid-column: 1 / -1;
  grid-row: 1 / 7;
}

.event-2{
  grid-column: 1 / 5;
  grid-row: 7 / -1;
}

.event-3{
  grid-column: 5 / 9;
  grid-row: 7 / -1;
}

.event-4{
  grid-column: 9 / -1;
  grid-row: 7 / -1;
}

@media only screen and (max-width: 400px) {
  .custom-grid{
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}

</style>