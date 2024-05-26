<template>
    <div>
        <Navbar />


        <div class="container mt-5">

            <h1>Cart</h1>
            <div class="row">
                <div class="col-12 col-lg-6 col-md-6 mb-2" v-for="(item, id) in groupedOrders" :key="id">
                    <!-- <div class="card" style="width: 18rem;">
                        <img :src="items.prodUrl" class="card-img-top" alt="...">
                        <div class="card-body">
                            <p class="card-text">{{ items.prodName }}</p>
                            <p class="card-text">R{{ items.amount }}</p>
                        </div>
                    </div> -->
                    <!-- <table class="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Amount</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, id) in groupedOrders" :key="id">
                                <td>
                                    <img :src="item[0].prodUrl" class="rounded" style="width: 5rem" alt="">
                                </td>
                                <td>{{ item[0].prodName }}</td>
                                <td>R{{ item[0].amount }}</td>
                                <td>{{ item.length }}</td>
                                <td>
                                    <button class="btn" @click="delProd(items.orderID)"><i class="bi bi-trash3"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table> -->
                    <div class="card mb-3 w-100" style="max-width: 540px;">
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {{ item.length }}
                        </span>
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img :src="item[0].prodUrl" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">{{ item[0].prodName }}</h5>
                                    <p class="card-text">R{{ item[0].amount }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p>Total - R{{ subTotal }}</p>
            </div>
            <router-link to="/products" class="btn btn-dark my-5">Proceed to payment<i class="bi bi-arrow-right ps-2" style="font-size: 1rem;"></i></router-link>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/HomeComponents/NavbarComp.vue'
import { mapActions, mapState } from 'vuex'

export default {

    components: {
        Navbar
    },
    computed: {
        ...mapState('orders', ['orders']),

        groupedOrders() {
            if (!this.orders) {
                return {}; // Return an empty object or handle null/undefined orders.
            }
            const grouped = {}

            this.orders.forEach((order) => {
                const id = order.bmxID

                if (!grouped[id]) {
                    grouped[id] = []
                }

                grouped[id].push(order)
            })

            return grouped
        },
        subTotal() {
            return Object.values(this.groupedOrders).reduce((total, group) => {
                return total + group[0].amount * group.length
            }, 0)
        }
    },
    methods: {
        ...mapActions('orders', ['fetchOrders', 'deleteOrder']),
        async delProd(items) {
            try {
                await this.deleteOrder(items)
                this.fetchOrders()
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        this.fetchOrders()
    },
    created() {
        console.log("Orders: ", this.orders);
    }
}
</script>

<style scoped>
i {
    font-size: 2rem;
    cursor: pointer;
}
</style>