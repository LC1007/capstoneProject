<template>
    <div>
        <div class="app">

            <div class="d-flex d-sm-flex justify-content-between align-items-center">
                <div class="d-sm-flex flex-sm-column">
                    <h1 class="my-5">FRAMES</h1>
                </div>
            </div>
            <div class="container">
                <div class="row" v-if="sortedAndFilteredBikes">
                    <div class="col-sm-12 col-lg-3 w-25 p-0">
                        <div class="me-5 d-flex flex-column w-50">
                            <div class="custom-group">
                                    <input type="text" class="form-control" v-model="searchQuery" @input="performSearch" placeholder="BMX">
                                    <i class="bi bi-x-circle custom-icon" @click="clear"></i>
                                </div>
                                <button class="btn my-2" style="outline: 1px solid black" @click="toggleSort">Sort</button>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-8 mb-5">
                        <div class="custom-container">
                            <div class="card border-0 m-0" v-for="bike in sortedAndFilteredBikes" :key="bike.bmxID"
                                style="width: 18rem;">
                                <img :src="bike.prodUrl" class="card-img-top pb-2 rounded-0" alt="">
                                <div class="card-body p-3">
                                    <h5 class="fw-normal">{{ bike.prodName }}</h5>
                                    <p>R{{ bike.amount }}</p>
                                    <button class="btn btn-dark" @click="addProd(bike.bmxID)"><i
                                            class="bi bi-cart"></i></button>
                                </div>
                            </div>
                            <h4 v-if="noMatch" class="d-flex justify-content-center">No results found</h4>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            sortOrder: 'asc',
            bikesArr: [],
            searchQuery: '',
            noMatch: false,
        };
    },
    computed: {
        sortedAndFilteredBikes() {
            const query = this.searchQuery.toLowerCase();
            const filtered = this.bikesArr.filter(item => {
                // Filter by both category and search query
                return item.category === 'frames' && item.prodName.toLowerCase().includes(query);
            });

            if (filtered.length === 0) {
                this.noMatch = true
                return []
            } else {
                this.noMatch = false

                const sorted = [...filtered]
                if (this.sortOrder === 'asc') {
                    sorted.sort((a, b) => a.amount - b.amount)
                } else {
                    sorted.sort((a, b) => b.amount - a.amount)
                }

                return sorted
            }
        },
    },
    methods: {
        toggleSort() {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        },

        performSearch() {
            const query = this.searchQuery.toLowerCase()
            const filterd = this.bikesArr.filter(item => {
                return item.category === 'frames' && item.prodName.toLowerCase().includes(query)
            })

            if (filterd.length === 0) {
                this.noMatch = true
                this.filteredBikes = []
            } else {
                this.noMatch = false
            }
        },
        clear() {
            this.searchQuery = '';
            this.noMatch = false;
        },
    },
    created() {
        this.bikesArr = JSON.parse(localStorage.getItem('bikes')) || [];
    },
};
</script>

<style scoped>
.app {
    min-height: 500px;
}

img {
    aspect-ratio: 1 / 1;
    object-fit: contain;
    width: 100%;
}

.custom-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    place-items: center;
}

.custom-group {
    display: flex;
    align-items: center;
}

i {
    margin-left: 10px;
}
</style>