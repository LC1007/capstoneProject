<template>
    <div>
        <NavbarComp />

        <div class="container">
            <div class="row my-5">
                <div class="col-sm-12 col-lg-5">
                    <img src="https://images.unsplash.com/photo-1565277441243-2be39689f95b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1929&q=80"
                        class="w-100" alt="">
                </div>
                <div class="col-sm-12 col-lg-5">
                    <h1 class="mt-2">Lets Talk</h1>
                    <Form action="https://formspree.io/f/xayzkqly" method="POST">
                            <div class="mb-3">
                                <label for="name" class="form-label">Full Name</label>
                                <Field name="name" class="form-control"  type="text" :rules="required"/>
                                <ErrorMessage name="name" style="color: red"/>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email address</label>
                                <Field name="email" class="form-control" type="email" :rules="validateEmail"/>
                                <ErrorMessage name="email" style="color: red"/>
                            </div>
                            <div class="mb-3">
                                <label for="messgae" class="form-label">Message</label>
                                <textarea name="messgae" class="form-control" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div class="d-flex justify-content-center">
                                <button type="submit" class="btn btn-dark">Submit</button>
                            </div>
                        </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavbarComp from '@/components/HomeComponents/NavbarComp.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
export default {
    components: {
        NavbarComp,
        ErrorMessage,
        Form,
        Field
    },
    methods:{
        validateEmail(value) {
            // if the field is empty
            if (!value) {
                return 'This field is required';
            }
            // if the field is not a valid email
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!regex.test(value)) {
                return 'This field must be a valid email';
            }
            // All is good
            return true;
        },

        required(value) {
            if (!value) {
                return 'This field is required';
            }
            // All is good
            return true;
        }
    }   
}
</script>

<style scoped></style>