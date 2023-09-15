<template>
    <div>
        <!-- <NavbarComp/> -->
        <div class="d-flex d-sm-flex justify-content-between align-items-center">
            <div class="d-sm-flex flex-sm-column">
            <h1 class="my-5">HANDLEBARS</h1>
            </div>
        </div>
        <div class="container">
            <div class="row" v-if="filteredBikes.length">
                <div class="col col-lg-3 w-25">
                    <div class="me-5 d-flex flex-column w-50">
                        <div class="custom-group">
                            <form @submit.prevent="searchForm">
                                <input type="text" class="form-control w-100 h-100 me-2 custom-input" v-model="searchQuery"
                                    placeholder="BMX">
                                <div v-if="message">
                                    <p>{{ message }}</p>
                                </div>
                                <button class="btn">Search</button>
                            </form>
                            <i class="bi bi-x-circle custom-icon" @click="clear"></i>
                        </div>
                            <button class="btn btn-dark w-100 h-100 my-2" @click="sortBikes('prodName')">Sort By Name</button>
                            <button class="btn btn-dark w-100 h-100 my-2" @click="sortBikes('amount')">Sort By Price</button>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="custom-container">
                        <div class="card border-0 m-0" v-for="bike in filteredBikes" :key="bike.bmxID" style="width: 18rem;">
                            <img :src="bike.prodUrl" class="card-img-top pb-2 rounded-0" alt="">
                            <div class="card-body p-3">
                                <h5 class="fw-normal">{{ bike.prodName }}</h5>
                                <p>R{{ bike.amount }}</p>
                                <button class="btn btn-dark" @click="addProd(bike.bmxID)"><i class="bi bi-cart"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="d-flex justify-content-center w-100 mb-5">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useCookies } from "vue3-cookies";
import { mapActions, mapState } from 'vuex'
import NavbarComp from "../TestNav.vue";

const { cookies } = useCookies();
export default {
    components: {
        NavbarComp,
    },
    data() {
        return {
            searchTerm: {
                prodName: ''
            }
        }
    },
    computed: {
        ...mapState('products', ['sortOrder', 'sortOption', 'msg']),
        ...mapState('usermodule', ['userID']),
        
        filteredBikes() {
            const bikesArr = JSON.parse(localStorage.getItem('bikes'))
            const categoryToShow = 'handlebars'
            // console.log(bikesArr);
            return bikesArr.filter((bike) => bike.category === categoryToShow)
        }
        // sortedBikes() {
        //     const sortingFunc = (a, b) => {
        //         if (this.sortOption === 'amount') {
        //             return this.sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount
        //         } else if (this.sortOption === 'prodName') {
        //             return this.sortOrder === 'asc' ?
        //                 a.prodName.localeCompare(b.prodName) :
        //                 b.prodName.localeCompare(a.prodName)
        //         }

        //         return 0
        //     }

        //     return [...this.bikes].sort(sortingFunc)
        // }
    },
    methods: {
        ...mapActions('products', ['addProductToCart', 'searchProd']),

        // sortBikes() {
        //     const option = this.sortOption === 'amount' ? 'prodName' : 'amount'
        //     this.$store.commit('products/setSortOption', option)
        // },

        // addProd(bike) {
        //     const cookieToken = cookies.get('loggedInUser')
        //     if (cookieToken) {
        //         const loggedInUserID = this.userID
        //         this.addProductToCart({ loggedInUserID, bmxID: bike })
        //     }
        // },

        // searchForm() {
        //     if (!this.searchQuery === null) {
        //         const message = 'Invalid'
        //         return message
        //     } else if (this.searchQuery) {
        //         this.searchProd(this.searchQuery)
        //     }
        // },

        // clear() {
        //     this.searchQuery = ''
        //     this.fetchBikes()
        // }
    },
    mounted() {
        // this.fetchBikes()
    }
}
</script>

<style scoped>
img {
    aspect-ratio: 1 / 1;
    object-fit: contain;
    width: 100%;
}

.custom-container{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

.custom-input {
    margin: 0px;
    padding-right: 1rem;
    width: 100%;
    outline: none;
    height: 30px;
    border-radius: 5px;
}

.custom-icon {
    position: absolute;
    top: 0;
    border-radius: 5px;
    right: 9px;
    z-index: 2;
    border: none;
    top: 6px;
    height: 30px;
    cursor: pointer;
    color: #000;
    transform: translateX(2px);
}
</style>