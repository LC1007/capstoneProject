<template>
    <div>
        <Navbar />
        <div class="container">
            <h1 class="text-center my-5">Edit User</h1>
            <form @submit.prevent="createUserForm">
                <div v-if="selectedUserEdit">

                    <div class="mb-3">
                        <label for="firstName" class="form-label">First Name</label>
                        <input type="text" v-model="selectedUserEdit.firstName" class="form-control" id="productName"
                            name="firstName">
                    </div>
                    <div class="mb-3">
                        <label for="lastName" class="form-label">Last Name</label>
                            <input type="text" v-model="selectedUserEdit.lastName" class="form-control" name="lastName">
                    </div>
                    <div class="mb-3">
                        <label for="userDOB" class="form-label">User DOB</label>
                        <input type="text" v-model="selectedUserEdit.userDOB" class="form-control" name="userDOB">
                    </div>
                    <div class="mb-3">
                        <label for="emailAdd" class="form-label">Email Address</label>
                        <input type="text" class="form-control" v-model="selectedUserEdit.emailAdd">
                    </div>
                    <div class="mb-3">
                        <label for="profileUrl" class="form-label">Image</label>
                        <input type="url" v-model="selectedUserEdit.profileUrl" class="form-control" id="profileUrl">
                    </div>
                    <div class="mb-3">
                        <label for="role" class="form-label">Role</label>
                        <input type="text" v-model="selectedUserEdit.userRole" class="form-control" id="role">
                    </div>
                    <router-link to="/admin" class="btn btn-dark my-3">Cancel</router-link>
                    <button type="submit" class="btn btn-dark my-3 ms-3" @click="saveEdit(selectedUserEdit)">Update</button>
                </div>
                <div v-else>
                    <p>Loading...</p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/HomeComponents/NavbarComp.vue'
import { mapActions, mapState } from 'vuex'
import sweet from 'sweetalert'

export default {
    data() {
        return {
            populatedData(selectedUserEdit) {
                this.selectedUserEdit = {
                    firstName: selectedUserEdit?.firstName || '',
                    lastName: selectedUserEdit?.lastName || '',
                    userDOB: selectedUserEdit?.userDOB || '',
                    emailAdd: selectedUserEdit?.emailAdd || '',
                    profileUrl: selectedUserEdit?.profileUrl || '',
                    userRole: selectedUserEdit?.userRole  || ''
                }
            }
        }
    },
    computed: {
        ...mapState('usermodule', ['selectedUserEdit', 'userID'])
    },
    components: {
        Navbar
    },
    methods: {
        ...mapActions('usermodule', ['fetchUser', 'updateUser']),
        async saveEdit(user) {
            try {
                await this.updateUser(user)
                sweet({
                    title: 'User',
                    text: 'User Updated',
                    icon: 'success',
                    timer: 4000
                })
            } catch (error) {
                console.error('Error updating user:', error);
                console.log('User:', user);
            }
        }
    },
    mounted() {

    },
    async created() {
        const userID = this.$route.params.userID
        await this.fetchUser(userID)
    },
}
</script>

<style scoped>
input,
textarea {
    border: 2px solid black;
    border-radius: 4px;
}
</style>