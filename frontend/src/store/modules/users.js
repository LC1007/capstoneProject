import axios from "axios";
import { useCookies } from "vue3-cookies";
import authUser from "@/services/AuthenicateUser";
import router from "@/router";
import sweet from 'sweetalert'

const { cookies } = useCookies();
const url = "https://wethebmx.onrender.com/";

const state = {
  users: null,
  user: null,
  userID: localStorage.getItem("userID") || null,
  successMsg: null,
  selectedUserEdit: null,
  deleteInProgress: false,
};

const mutations = {
  setUsers(state, updatedUser) {
    state.users = updatedUser;
  },
  setUser(state, data) {
    state.user = data;
  },
  setUserID(state, userID) {
    state.userID = userID;
  },
  setErrMsg(state, errMsg) {
    state.errMsg = errMsg;
  },
  setSuccessMsg(state, msg) {
    state.successMsg = msg;
  },
  clearMessages(state) {
    state.successMsg = null;
    state.errMsg = null;
  },
  // setUpdateUser(state, updatedUser) {
  //   const exisitingUserID = state.users.findIndex(
  //     (user) => user.userID === updatedUser.userID
  //   );
  //   if (exisitingUserID !== 1) {
  //     state.users[exisitingUserID] = updatedUser;
  //   }
  // },
  setSelectedUserEdit(state, user) {
    state.selectedUserEdit = user;
  },
  setDeleteInProgress(state, value) {
    state.deleteInProgress = value;
  },
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
      const { user } = (await axios.get(`${url}user/${userID}`)).data;

      commit("setSelectedUserEdit", user[0]);
      commit("setUserID", user[0].userID);
      console.log("User ID: ", user[0].userID);
    } catch (error) {
      console.log("There was an error trying to fetch user with ID:", userID);
    }
  },

  async updateUser({ commit, dispatch }, user) {
    try {
      const { data } = await axios.patch(`${url}user/${user.userID}`, user);
      commit("setUsers", data);
      dispatch('fetchUsers')
    } catch (error) {
      console.log(error);
    }
  },

  async deleteUser({ commit, dispatch }, {user, userID}) {
    commit("setDeleteInProgress", true);
    try {
      const { msg } = (await axios.delete(`${url}user/${userID}`)).data;
      if (msg) {
        commit("setUser", msg);
        dispatch("fetchUsers");
      }
    } catch (error) {
      console.log(error);
    } finally {
      commit("setDeleteInProgress", false);
    }
  },

  async submitSignup({ commit, dispatch }, formData) {
    try {
      const { msg } = (await axios.post(`${url}register`, formData)).data;

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
      const { msg, token, result } = (
        await axios.post(`${url}login`, loginData)
      ).data;
      if (msg) {
        localStorage.setItem("userID", result.userID);

        console.log("Test:", result);
        console.log("ID:", result.userID);

        commit("setUser",  result );
        commit("setUserID", result.userID);

        cookies.set("loggedInUser", { token, result });
        authUser.applyToken(token);
        router.push({ name: "home" });
      }
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
