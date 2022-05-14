<template>
  <section class="tables">
    <div class="container">
      <h2 class="title">Tables</h2>
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <select class="form-select mb-3" v-model="selectBranch">
            <option disabled value="">Please select Branch</option>
            <option
              v-for="(branch, i) in allBranches"
              :key="i"
              :value="branch.name"
            >
              {{ branch.name }}
            </option>
          </select>
        </div>
        <nav class="holeNav">
          <ul class="list-unstyled">
            <li v-for="(hole, i) in holes" :key="i">
              <router-link :to="`/add-table/${hole.name}/${hole.id}`"
                >hole {{ hole.name }}</router-link
              >
            </li>
          </ul>
        </nav>
      </div>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
// import axios from "axios";
import { mapMutations, mapState } from "vuex";
export default {
  name: "AddTables",
  data() {
    return {
      selectBranch: "",
      holes: [
        {
          name: "First",
          id: 1,
        },
        {
          name: "Second",
          id: 2,
        },
        {
          name: "Third",
          id: 3,
        },
        {
          name: "Fourth",
          id: 4,
        },
        {
          name: "fifth",
          id: 5,
        },
      ],
      editBtn: null,
    };
  },
  computed: {
    ...mapState(["allBranches", "allMenus"]),
  },
  methods: {
    ...mapMutations(["getAllBranches", "getAllMenus"]),
  },
  mounted() {
    this.getAllBranches();
  },
};
</script>

<style></style>
