import axios from "axios"
import router from '@/router'
const url = "https://wethebmx.onrender.com/";
import sweet from "sweetalert";

const state = {
  bikes: [],
  featuredBikes: null,
  selectedBike: null,
  selectedBikeEdit: null,
  deleteInProgress: false,
  prodDetails: null,
  cart: null,
  bikeID: localStorage.getItem("bikeID") || null,
  // Sort and Filter
  sortOrder: "asc",
  sortOption: "amount",
  categoryFilter: null,
  searchQuery: "",
  sortBy: "",
  filterBy: '',
};

const getters = {
  getProduct(state){
    return state.selectedBike;
  },
}

const mutations = {
  setBikes(state, updatedBike) {
    state.bikes = updatedBike;
  },
  setFeaturedBikes(state, data) {
    state.featuredBikes = data;
  },
  setProdDetails(state, data) {
    state.prodDetails = data;
  },
  setSelectedBike(state, data) {
    state.selectedBike = data;
  },
  setSelectedBikeEdit(state, data) {
    state.selectedBikeEdit = data;
  },
  setCart(state, data) {
    state.cart = data;
  },
  setBikeID(state, data) {
    state.bikeID = data;
  },
  setUpdateBike(state, updatedBike) {
    const exisitingProdID = state.bikes.findIndex(
      (bike) => bike.bmxID === updatedBike.bmxID
    );
    if (exisitingProdID !== 1) {
      state.bikes[exisitingProdID] = updatedBike;
    }
  },
  setDeleteInProgress(state, value) {
    state.deleteInProgress = value;
  },

  // Sort and Filter
  setSortOrder(state, sortOrder) {
    state.sortOrder = sortOrder;
  },
  setSortOption(state, option) {
    state.sortOption = option;
  },
  setCategoryFilter(state, category) {
    state.categoryFilter = category;
  },
  setSearchQuery(state, query) {
    state.searchQuery = query;
  },
  setSortBy(state, sortBy) {
    state.sortBy = sortBy;
  },
  setFilterBy(state, filterBy) {
    state.filterBy = filterBy;
  },
};

const actions = {
  async fetchBikes({ commit }) {
    try {
      const { products } = (await axios.get(`${url}products`)).data;
      commit("setBikes", products);
      localStorage.setItem('bikes', JSON.stringify(products))
    } catch (error) {
      console.log("There was an error trying to fetch products:", error);
      router.push({name: 'login'})
    }
  },

  async fetchBike({ commit }, bmxID) {
    try {
      const { result } = (await axios.get(`${url}product/${bmxID}`)).data;

      localStorage.setItem("bikeID", result[0].bmxID);

      commit("setSelectedBike", result[0]);
      commit("setSelectedBikeEdit", result[0]);
      commit("setBikeID", ID);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  },

  async createProd({ commit }, addProd) {
    try {
      const { data } = await axios.post(`${url}products`, addProd);
      commit("setProdDetails", data);
    } catch (error) {}
  },

  async updateBike({ commit, dispatch }, bike) {
    try {
      const { products } = (await axios.patch(`${url}product/${bike.bmxID}`, bike)).data;
      commit("setBikes", products);
      dispatch("fetchBikes");
      router.push({name: 'admin'})
    } catch (error) {
      console.log(error);
    }
  },

  async deleteBike({commit, dispatch, state}, bike){
    commit("setDeleteInProgress", true);
    try {
      const { msg } = (await axios.delete(`${url}product/${bike.bmxID}`)).data
      if(msg){
         commit("setBikes", msg);
         dispatch('fetchBikes')
      }
    } catch (error) {
      console.log(error);
    } finally{
        commit("setDeleteInProgress", false);
    }
  },

  // Single product add to cart
  async addToCart({ commit }, loggedInUserID) {
    try {
      const bmxID = localStorage.getItem("bikeID");
      const { data } = await axios.post(`${url}order/${loggedInUserID}/${bmxID}`);
      commit("setCart", data);
      console.log(data.result);
    } catch (error) {
      console.log(error);
    }
  },

  // All products add to cart
  async addProductToCart({ commit }, {loggedInUserID, bmxID}) {
    try {
      console.log("Store:", bmxID, loggedInUserID);
      const { data } = await axios.post(`${url}order/${loggedInUserID}/${bmxID}`);
      commit("setCart", data);
      console.log(data.result);
    } catch (error) {
      console.log(error);
    }
  },

  // Sort/Search/Filter

  async featuredProducts({ commit }) {
    try {
      const { data } = await axios.get(`${url}products/featured`);
      commit("setFeaturedBikes", data.products);
    } catch (error) {
      console.log(error);
    }
  },

  async searchProd({commit}, searchQuery){
    try {
      const { data } = await axios.post(`${url}products/search/${searchQuery}`)
      
      commit('setBikes', data.product)
    } catch (error) {
      console.error("Error fetching products:", error);
      sweet({
        title: "Product not found",
        icon: "error",
        timer: 4500,
      });
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
