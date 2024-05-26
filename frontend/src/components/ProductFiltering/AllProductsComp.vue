<template>
    <div>
        <!-- <NavbarComp/> -->
        <div class="d-flex d-sm-flex justify-content-between align-items-center">
            <div class="d-sm-flex flex-sm-column">
            <h1 class="my-5">ALL PRODUCTS</h1>
            </div>
        </div>
        <div class="container">
            <div class="row" v-if="sortedBikes.length">
                <div class="col col-lg-3 w-25">
                    <div class="me-5 d-flex flex-column w-50">
                        <div class="custom-group">
                            <form @submit.prevent="searchForm">
                                <input type="text" class="form-control w-100 h-100 me-2 custom-input" v-model="searchQuery"
                                    placeholder="BMX">
                            </form>
                            <i class="bi bi-x-circle" @click="clear"></i>
                        </div>
                            <button class="btn w-100 h-100 my-2" style="outline: 1px solid black" @click="sortBikes('prodName')">Sort By Name</button>
                            <button class="btn w-100 h-100 my-2" style="outline: 1px solid black" @click="sortBikes('amount')">Sort By Price</button>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="custom-container">
                        <div class="card border-0 m-0" v-for="bike in sortedBikes" :key="bike.bmxID" style="width: 18rem;">
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
import { Form, Field, ErrorMessage } from 'vee-validate';

const { cookies } = useCookies();
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            searchTerm: {
                prodName: ''
            }
        }
    },
    computed: {
        ...mapState('products', ['bikes', 'sortOrder', 'sortOption', 'msg']),
        ...mapState('usermodule', ['userID']),
        sortedBikes() {
            const sortingFunc = (a, b) => {
                if (this.sortOption === 'amount') {
                    return this.sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount
                } else if (this.sortOption === 'prodName') {
                    return this.sortOrder === 'asc' ?
                        a.prodName.localeCompare(b.prodName) :
                        b.prodName.localeCompare(a.prodName)
                }

                return 0
            }

            return [...this.bikes].sort(sortingFunc)
        }
    },
    methods: {
        ...mapActions('products', ['fetchBikes', 'addProductToCart', 'searchProd']),

        sortBikes() {
            const option = this.sortOption === 'amount' ? 'prodName' : 'amount'
            this.$store.commit('products/setSortOption', option)
        },

        addProd(bike) {
            const cookieToken = cookies.get('loggedInUser')
            if (cookieToken) {
                const loggedInUserID = this.userID
                this.addProductToCart({ loggedInUserID, bmxID: bike })
            }
        },

        searchForm() {
            if (!this.searchQuery === null) {
                const message = 'Invalid'
                return message
            } else if (this.searchQuery) {
                this.searchProd(this.searchQuery)
            }
        },

        clear() {
            this.searchQuery = ''
            this.fetchBikes()
        }
    },
    mounted() {
        this.fetchBikes()
    }
}
</script>

<style scoped>
img {
    aspect-ratio: 1 / 1;
    object-fit: contain;
    width: 100%;
}

.custom-group {
    display: flex;
    align-items: center;
    justify-content: center;
}

i {
    margin-left: 10px;
}

.custom-container{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}


.custom-group{
    display: flex;
    align-items: center;
}

i{
    margin-left: 10px;
}

.custom-input {
    margin: 0px;
    padding-right: 1rem;
    width: 100%;
    outline: none;
    height: 30px;
    border-radius: 5px;
}
</style>