import axios from "axios";
import { useCookies } from "vue3-cookies";
import authUser from "@/services/AuthenicateUser";
import router from "@/router";
import sweet from 'sweetalert'

const { cookies } = useCookies();
const url = "https://bmxcap.onrender.com/";

const state = {
    users: null,
    user: null,
    userID: localStorage.getItem('userID') || null,
    successMsg: null,
    errMsg: null
}

const mutations = {
  setUsers(state, data) {
    state.users = data;
  },
  setUser(state, data) {
    state.user = data;
  },
  setUserID(state, userID) {
    state.userID = userID;
  },
  setErrMsg(state, errMsg){
    state.errMsg = errMsg;
  },
  setSuccessMsg(state, msg){
    state.successMsg = msg
  },
  clearMessages(state){
    state.successMsg = null
    state.errMsg = null
  },
  setUpdateUser(state, updatedUser){
    const exisitingUserID = state.users.findIndex((user) => user.userID === updatedUser.userID)
    if(exisitingUserID !== 1){
      state.users[exisitingUserID] = updatedUser
    }
  }
};

const actions = {
  async fetchUsers({ commit }) {
    try {
      const { data } = await axios.get(`${url}users`);
      commit("setUsers", data.users);
    } catch (error) {
      console.log("There was an error trying to fetch users");
    }
  },

  async fetchUser({ commit }, userID) {
    try {
      const { data } = await axios.get(`${url}user/${userID}`);
      commit("setUser", data.user[0]);
    } catch (error) {
      console.log("There was an error trying to fetch user with ID:", userID);
    }
  },

  async submitSignup({commit, dispatch}, formData){
    try {
      const { msg } = (await axios.post(`${url}register`, formData)).data

      if (msg) {
        sweet({
          title: "Account Created",
          text: msg,
          icon: "success",
          timer: 4500,
        });
        dispatch("fetchUsers");
        router.push({ name: "login" });
      }
    } catch (error) {
      sweet({
        title: "A user with this email already exists",
        icon: "error",
        timer: 4500,
      });
    }
  },

  async submitLogin({ commit }, loginData) {
    try {
      const { msg, token, result, userID, errMsg } = (
        await axios.post(`${url}login`, loginData)
      ).data;
      if (result) {
        localStorage.setItem("userID", userID);

        commit("setUser", { result });
        commit("setUserID", userID);

        console.log(result);

        cookies.set("loggedInUser", { token, result });
        authUser.applyToken(token);
        // sweet({
        //   title: "Login",
        //   text: msg,
        //   icon: "success",
        //   timer: 4000,
        // });
        router.push({ name: "home" });
      } 
      // else {
      //   sweet({
      //     title: "Error",
      //     errMsg: errMsg,
      //     icon: "error",
      //     timer: 4000,
      //   });
      // }
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
