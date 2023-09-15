<template>
  <div>
    <Navbar />
    <div class="container">
      <nav aria-label="breadcrumb" class="m-5">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Neo Bmx 16"
          </li>
        </ol>
      </nav>
      <div
        class="d-sm-flex justify-content-center m-2 m-5 gap-3"
        v-if="selectedBike"
      >
        <div>
          <img :src="selectedBike.prodUrl" class="custom-img pe-md-5" alt="" />
        </div>
        <div class="w-75">
          <h1>{{ selectedBike.prodName }}</h1>
          <p>R{{ selectedBike.amount }}</p>
          <p>{{ selectedBike.prodDesc }}</p>
          <button class="btn btn-dark" @click="add">Add to cart</button>
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
  </div>
</template>

<script>
import Navbar from "@/components/HomeComponents/NavbarComp.vue";
import { mapActions, mapState } from "vuex";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default {
  components: {
    Navbar,
  },
  computed: {
    ...mapState("products", ["selectedBike", "bikeID"]),
    ...mapState("usermodule", ["userID"]),
  },
  async created() {
    const bmxID = this.$route.params.bmxID;
    await this.fetchBike(bmxID);
  },
  methods: {
    ...mapActions("products", ["fetchBike", "addToCart"]),

    add() {
      const cookieToken = cookies.get("loggedInUser");
      if (cookieToken) {
        const loggedInUserID = this.userID; // This is coming from the state userID
        const bmxID = this.bikeID; // This is coming from the state bikeID
        console.log(`orders/${this.userID}/${bmxID}`);
        this.addToCart(loggedInUserID, bmxID);
      }

      if (!cookieToken) {
        alert("Please sign in");
      }
    },
  },
};
</script>

<style scoped>
.custom-img {
  aspect-ratio: 1 / 1;
  width: 100%;
  object-fit: contain;
}

.custom-img-small {
  width: 20%;
}

i {
  font-size: 2rem;
  cursor: pointer;
}

.custom-message {
  aspect-ratio: 1 / 1;
  background-color: red;
  width: 10rem;
}
</style>
