<template>
    <div>
        <Navbar />
<div class="container mb-5">
            <div class="row" v-if="result">
                <div class="d-flex align-items-center justify-content-center">
                <h1 class="text-center my-5">Profile</h1>
                <router-link to="/admin" class="btn btn-dark mx-3">Admin</router-link>
            </div>
                <div class="col h-100">
                    <img :src="result.profileUrl" class="w-50"
                        alt="">
                </div>
                <div class="col h-100">
                    <h4>Name:</h4>
                    <template v-if="result.isEdit">
                        <input type="text" class="my-2 form-control" v-model="result.firstName" name="" id="">
                    </template>
                    <template v-else>
                        <p>{{ result.firstName }}</p>
                    </template>
                    <h4>Surname:</h4>
                    <template v-if="result.isEdit">
                            <input type="text" class="my-2 form-control" v-model="result.lastName" name="" id="">
                        </template>
                        <template v-else>
                            <p>{{ result.lastName }}</p>
                        </template>
                    <h4>Email:</h4>
                    <template v-if="result.isEdit">
                            <input type="text" class="my-2 form-control" v-model="result.emailAdd" name="" id="">
                        </template>
                        <template v-else>
                            <p>{{ result.emailAdd }}</p>
                        </template>
                        <h4>Gender:</h4>
                    <template v-if="result.isEdit">
                            <input type="text" class="my-2 form-control" v-model="result.gender" name="" id="">
                        </template>
                        <template v-else>
                            <p>{{ result.gender }}</p>
                        </template>
                    <h4>Profile Image:</h4>
                    <template v-if="result.isEdit">
                            <input type="text" class="my-2 form-control" v-model="result.profileUrl" name="" id="">
                        </template>
                        <template v-else>
                            <p>{{ result.profileUrl }}</p>
                        </template>

                        <template v-if="result.isEdit">

                            <button class="btn" @click="btnPassword(result)">Reset Password?</button>

                            <template v-if="result.showPassword">
                                <input type="text" class="form-control" name="" id="">
                            </template>
                        </template>
                    <template v-if="!result.isEdit">
                        <div>
                            <button class="btn my-2 " @click="startEdit(result)">
                                <i class="bi bi-pencil pe-2"></i>Edit
                            </button>
                            <router-link :to="'/user/edit/' + result.userID">Edit</router-link>
                        </div>
                    </template>
                    <template v-else>
                        <div class="">
                            <button class="btn my-2" @click="saveEdit(result)">
                                <i class="bi bi-save2 pe-2"></i>Save
                            </button>
                            <button class="btn" @click="stopEdit(result)">
                                <i class="bi bi-x-circle pe-2"></i>Cancel
                            </button>
                        </div>
                    </template>
                </div>
            </div>
            <div v-else>
                <div class="d-flex justify-content-center w-100 my-5">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
            </div>
        </div>

    </div>
</template>

<script>
import Navbar from '@/components/HomeComponents/NavbarComp.vue'
import { mapActions, mapState } from 'vuex'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

export default {
    components: {
        Navbar
    },
    computed: {
        user() {
            return this.$store.state.usermodule.user || cookies.get('loggedInUser')
        },
        result() {
            return this.user?.result
        }
    },
    methods: {
        ...mapActions('usermodule', ['fetchUser']),
        startEdit(result) {
            result.isEdit = true
        },
        async saveEdit(result){
            try {
                const { isEdit, ...updateData } = result
                await this
                result.isEdit = false
            } catch (error) {
                
            }
        },
        stopEdit(result){
            result.isEdit = false
            result.showPassword = false
        },
        btnPassword(result){
            result.showPassword = true
        }
    },
    created() {
        const result = localStorage.getItem('userID')

        if (result) {
            this.fetchUser(result)
        }
    }
}
</script>

<style scoped></style>