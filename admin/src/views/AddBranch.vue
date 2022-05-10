<template>
  <section class="branch">
    <div class="container">
      <h2 class="title">Branch</h2>
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="form-group">
            <label for="branch">Branch Name</label>
            <input
              type="text"
              class="form-control"
              id="branch"
              placeholder="Enter Branch Name Please"
              v-model="branchName"
            />
          </div>
          <div class="d-grid mt-3">
            <button class="btn btn-success" @click="saveBranch()">Save</button>
          </div>
          <table class="table text-center mt-4 shadow">
            <thead class="table-dark">
              <tr>
                <th>ID</th>
                <th>Branch</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(branch, i) in allBranches" :key="i">
                <td>{{ branch.id }}</td>
                <td>
                  <span v-if="editBtn !== branch.id">{{ branch.name }}</span>
                  <input
                    type="text"
                    v-if="editBtn === branch.id"
                    v-model="branch.name"
                  />
                </td>
                <td>
                  <button
                    class="btn btn-warning"
                    v-if="editBtn !== branch.id"
                    @click="changeEdit(branch.id)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-success btn-sm"
                    v-if="editBtn === branch.id"
                    @click="updateBranch(branch.id, branch.name)"
                  >
                    Save
                  </button>
                  <button
                    class="btn btn-danger btn-sm ms-1"
                    v-if="editBtn === branch.id"
                    @click="deleteBranch(branch.id, branch.name)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Branch",
  data() {
    return {
      branchName: "",
      editBtn: null,
    };
  },
  methods: {
    ...mapMutations(["getAllBranches"]),
    async saveBranch() {
      if (this.branchName != "") {
        let result = await axios.post("http://localhost:3000/branch", {
          name: this.branchName,
        });
        if (result.status === 201) {
          this.branchName = "";
          this.$swal({
            position: "center-center",
            title: "Your Branch Created",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getAllBranches();
        }
      } else {
        this.$swal({
          position: "center-center",
          icon: "error",
          title: "Please Enter Your Branch",
        });
      }
    },
    changeEdit(index) {
      this.editBtn = index;
    },
    async updateBranch(index, newName) {
      if (newName !== "") {
        let result = await axios.put(`http://localhost:3000/branch/${index}`, {
          name: newName,
        });
        if (result.status === 200) {
          this.editBtn = null;
          this.$swal({
            position: "center-center",
            title: "Your Branch Updated",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        this.$swal({
          position: "center-center",
          icon: "error",
          title: "Please Enter Your Branch",
        });
      }
    },
    deleteBranch(index, delBranch) {
      this.$swal({
        icon: "question",
        title: `Do you want to Delete ${delBranch} Branch?`,
        showCancelButton: true,
        confirmButtonText: "Save",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let resGet = await axios.get(
            `http://localhost:3000/menu?branch=${delBranch}`
          );
          if (resGet.data.length > 0) {
            this.editBtn = null;
            this.$swal({
              position: "center-center",
              icon: "error",
              title: "This branch has menus, You can't delete it",
            });
          } else {
            let resDel = await axios.delete(
              `http://localhost:3000/branch/${index}`
            );
            if (resDel.status === 200) {
              this.editBtn = null;
              this.$swal({
                position: "center-center",
                title: "Your Branch Deleted",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
              this.getAllBranches();
            }
          }
        }
      });
    },
  },
  computed: {
    ...mapState(["allBranches"]),
  },
  mounted() {
    this.getAllBranches();
  },
};
</script>

<style></style>
