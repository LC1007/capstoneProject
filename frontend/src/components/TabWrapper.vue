<template>
    <div class="container">
        <!-- <ul class="nav nav-tabs">
            <li class="nav-item" v-for="title in tabTitles" :key="title" @click="selectedTitle = title">
              <a class="nav-link" aria-current="page">{{ title }}</a>
            </li>
          </ul> -->

          <p class="my-3">Filter by category: </p>
          <div class="d-flex">
            <button v-for="title in tabTitles" :key="title" @click="selectedTitle = title" class="btn custom-btn mx-1 mt-0 ms-0 me-1">{{ title }}</button>
          </div>
        <slot/>
    </div>
</template>

<script>
import { ref, provide } from 'vue'
    export default {
        setup(props, { slots }) {
            const tabTitles = ref(slots.default().map((tab) => tab.props.title))
            const selectedTitle = ref(tabTitles.value[0])

            provide('selectedTitle', selectedTitle)
            return{
                selectedTitle,
                tabTitles
            }
        }
    }
</script>

<style scoped>
.custom-btn{
    outline: 1px solid black;
    margin-inline: 1rem;
    margin-top: 1rem;
}
</style>