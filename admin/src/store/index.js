import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  allBranches: [],
  allMenus: [],
  allGroups: [],
  allSubGroups: [],
};

const mutations = {
  async getAllBranches(state) {
    let result = await axios.get("http://localhost:3000/branch");
    if (result.status == 200) {
      state.allBranches = result.data;
    }
  },
  async getAllMenus(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/menu?branch=${payload.branchName}`
    );
    if (result.status === 200) {
      state.allMenus = result.data;
    }
  },
  async getAllGroups(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/group?branch=${payload.branchName}&menu=${payload.menuName}`
    );
    if (result.status === 200) {
      state.allGroups = result.data;
    }
  },
  async getAllSubGroups(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/subgroup?branch=${payload.branchName}&menu=${payload.menuName}&group=${payload.groupName}`
    );
    if (result.status === 200) {
      state.allSubGroups = result.data;
    }
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions: {},
  modules: {},
});
