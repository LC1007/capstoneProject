<template>
    <div>
        <Navbar />
        <h1 class="text-center m-5">ADMIN PAGE</h1>
        <div class="container">
            <div class="d-flex justify-content-between my-5">
                <h1>Products</h1>
                <router-link to="/product/create" class="btn btn-dark h-100"><i class="bi bi-plus pe-2"
                        style="font-size: 1rem"></i>Create Product</router-link>
            </div>

            <div class="row">
                <div class="col-12 col-lg-3 col-md-6 g-3 custom-grid" v-for="bike in bikes" :key="bike.bmxID">
                    <div class="card m-auto custom-card h-100 w-100" style="width: 14rem;" v-if="bikes">
                        <div class="card-body">
                            <img :src="bike.prodUrl" class="card-img-top custom-img" alt="...">
                            <h5 class="card-title">{{ bike.prodName }}</h5>
                            <h5 class="card-title">R{{ bike.amount }}</h5>
                            <h5 class="card-title mb-5">{{ bike.category }}</h5>
                            <div class="d-flex btns">
                                <router-link :to="'/product/edit/' + bike.bmxID" class="btn my-2 "><i
                                        class="bi bi-pencil pe-2"></i>Edit</router-link>
                                <button class="btn" @click="delProd(bike)" :disabled="deleteInProgress" style="color: red">
                                    <i class="bi bi-trash3 pe-2" style="color: red"></i>Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p>Loading...</p>
                    </div>
                </div>

                <table class="table custom-table w-100">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="bike in bikes" :key="bike.bmxID">
                            <td>{{ bike.bmxID }}</td>
                            <td>
                                <img :src="bike.prodUrl" style="width: 7rem" alt="">
                            </td>
                            <td>{{ bike.prodName }}</td>
                            <td class="w-25">{{ bike.prodDesc }}</td>
                            <td>{{ bike.category }}</td>
                            <td>R{{ bike.amount }}</td>
                            <td>{{ bike.quantity }}</td>
                            <td>
                                <router-link :to="'/product/edit/' + bike.bmxID" class="btn my-2 "><i
                                        class="bi bi-pencil pe-2"></i>Edit</router-link>
                                <button class="btn" @click="delProd(bike)" :disabled="deleteInProgress" style="color: red">
                                    <i class="bi bi-trash3 pe-2" style="color: red"></i>Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h1 class="my-5">Users</h1>
                <div class="col-12 col-lg-3 col-md-6 g-3 custom-grid mb-5" v-for="user in users" :key="user.bmxID">
                    <div class="card custom-card h-100 w-100" style="width: 14rem;" v-if="users">
                        <div class="card-body">
                            <img :src="user.profileUrl"
                                class="card-img-top custom-img" alt="...">
                            <h5 class="card-title">{{ user.firstName }}</h5>
                            <h5 class="card-title">{{ user.lastName }}</h5>
                            <h5 class="card-title mb-5">{{ user.userRole }}</h5>
                            <div class="d-flex btns">
                                <router-link :to="'/user/edit/' + user.userID" class="btn my-2 "><i
                                        class="bi bi-pencil pe-2"></i>Edit</router-link>
                                <button class="btn" @click="delUser(user.userID)" style="color: red">
                                    <i class="bi bi-trash3 pe-2" style="color: red"></i>Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p>Loading...</p>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table custom-table mb-5">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>User Image</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Gender</th>
                                    <th>DOB</th>
                                    <th>Email</th>
                                    <th>User Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users" :key="user.userID">
                                    <td>{{ user.userID }}</td>
                                    <td>
                                        <img :src="user.profileUrl" style="width: 7rem" alt="">
                                    </td>
                                    <td>{{ user.firstName }}</td>
                                    <td>{{ user.lastName }}</td>
                                    <td>{{ user.gender }}</td>
                                    <td>{{ user.userDOB }}</td>
                                    <td>{{ user.emailAdd }}</td>
                                    <td>{{ user.userRole }}</td>
                                    <td>
                                        <router-link :to="'/user/edit/admin/' + user.userID" class="btn my-2 "><i
                                                class="bi bi-pencil pe-2"></i>Edit</router-link>
                                        <button class="btn" @click="delUser(user.userID)" style="color: red">
                                            <i class="bi bi-trash3 pe-2" style="color: red"></i>Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/HomeComponents/NavbarComp.vue'
import { mapActions, mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            addProd: {
                prodName: '',
                prodDesc: '',
                quantity: '',
                amount: '',
                prodUrl: ''
            },
            deleteInProgress: false
        }
    },
    components: {
        Navbar,
    },
    computed: {
        ...mapState('products', ['bikes', 'selectedBikeEdit', 'deleteInProgress']),
        ...mapState('usermodule', ['users', 'selectedUserEdit', 'deleteInProgress'])
    },
    mounted() {
        this.fetchBikes();
        this.fetchUsers();
    },
    methods: {
        ...mapActions('products', ['fetchBikes', 'fetchBike', 'createProd', 'updateBike', 'deleteBike']),
        ...mapActions('usermodule', ['fetchUsers', 'fetchUser', 'updateUser']),

       async delProd(bike) {

        this.$store.commit('products/setDeleteInProgress', false)
        await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    // this.deleteInProgress = true
                    this.deleteBike(bike)
                }
            })
        },

        async delUser(user) {

            this.$store.commit('products/setDeleteInProgress', false)
            await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    // this.deleteInProgress = true
                    this.deleteBike(user)
                }
            })
        }
    }
}
</script>

<style scoped>
.custom-img {
    aspect-ratio: 1 / 1;
    object-fit: contain;
}

.custom-card {
    position: relative;
}

.btns {
    position: absolute;
    bottom: 0;
}

.custom-grid {
    display: none;
}

.custom-table {
    display: block;
}

@media only screen and (width <=64rem) {
    .custom-grid {
        display: block;
    }

    .custom-table {
        display: none;
    }
}
</style>