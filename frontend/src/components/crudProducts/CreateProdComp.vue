<template>
    <div>
        <Navbar />
        <div class="container">
            <h1 class="text-center my-5">Create Product</h1>
            <form @submit.prevent="createProdForm">
                <div class="mb-3">
                    <label for="productName" class="form-label">BMX Name</label>
                    <input type="text" v-model="addProd.prodName" class="form-control" id="productName" name="productName">
                </div>
                <div class="mb-3">
                    <label for="productDesc" class="form-label">BMX Descripion</label>
                    <textarea name="productDesc" v-model="addProd.prodDesc" class="form-control" cols="30"
                        rows="10"></textarea>
                </div>
                <div class="mb-3">
                    <label for="quantity" class="form-label">Quantity</label>
                    <input type="number" v-model="addProd.quantity" class="form-control" name="quantity">
                </div>
                <div class="mb-3">
                    <label for="amount" class="form-label">Amount</label>
                    <input type="number" v-model="addProd.amount" class="form-control" name="amount">
                </div>
                <div class="mb-3">
                    <label for="category" class="form-label">Category</label>
                    <input type="text" class="form-control" v-model="addProd.category">
                </div>
                <div class="mb-3">
                    <label for="image" class="form-label">Image</label>
                    <input type="url" v-model="addProd.prodUrl" class="form-control" id="image">
                </div>
                <router-link to="/admin" class="btn btn-dark my-3">Cancel</router-link>
                <button type="submit" class="btn btn-dark my-3 ms-3">Create</button>
            </form>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/HomeComponents/NavbarComp.vue'
import { mapActions } from 'vuex'
import router from '@/router'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            addProd: {
                prodName: '',
                prodDesc: '',
                quantity: '',
                amount: '',
                category: '',
                prodUrl: ''
            }
        }
    },
    components: {
        Navbar
    },
    methods:{
        ...mapActions('products',['createProd']),
        async createProdForm(){
            try {
                await this.createProd(this.addProd)

                await Swal.fire({
                    icon: 'success',
                    title: 'Product Created Successfully',
                    toast: true, // Display as toast notification
                    position: 'top-end', // Position the toast at the top-right
                    showConfirmButton: false, // Hide the "OK" button
                    timer: 3000, // Automatically close after 3 seconds (adjust as needed)
                });

                router.push({ name: 'admin' })
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted(){

    }
}
</script>

<style scoped></style>