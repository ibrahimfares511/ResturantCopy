<template>
  <section>
    <div class="container">
      <h2 class="title">Menu</h2>
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <select
            class="form-select mb-3"
            v-model="selectBranch"
            @change="getAllMenus({ branchName: selectBranch })"
          >
            <option disabled value="">Please select Branch</option>
            <option
              v-for="(branch, i) in allBranches"
              :key="i"
              :value="branch.name"
            >
              {{ branch.name }}
            </option>
          </select>
          <div class="form-group">
            <label for="menu">Menu Name</label>
            <input
              type="text"
              class="form-control"
              id="menu"
              placeholder="Enter Menu Name Please"
              v-model="menuName"
            />
          </div>
          <div class="d-grid mt-3">
            <button class="btn btn-success" @click="saveMenu()">Save</button>
          </div>
          <table class="table text-center mt-4 shadow">
            <thead class="table-dark">
              <tr>
                <th>ID</th>
                <th>Menu</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(menu, i) in allMenus" :key="i">
                <td>{{ menu.id }}</td>
                <td>
                  <span v-if="editBtn !== menu.id">{{ menu.name }}</span>
                  <input
                    type="text"
                    v-if="editBtn === menu.id"
                    v-model="menu.name"
                  />
                </td>
                <td>
                  <button
                    class="btn btn-warning"
                    v-if="editBtn !== menu.id"
                    @click="changeEdit(menu.id)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-success btn-sm"
                    v-if="editBtn === menu.id"
                    @click="updateMenu(menu.id, menu.name)"
                  >
                    Save
                  </button>
                  <button
                    class="btn btn-danger btn-sm ms-1"
                    v-if="editBtn === menu.id"
                    @click="deleteMenu(menu.id, menu.name)"
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
  name: "AddMenu",
  data() {
    return {
      selectBranch: "",
      menuName: "",
      editBtn: null,
    };
  },
  computed: {
    ...mapState(["allBranches", "allMenus"]),
  },
  methods: {
    ...mapMutations(["getAllBranches", "getAllMenus"]),
    async saveMenu() {
      if (this.menuName != "" && this.selectBranch != "") {
        let result = await axios.post("http://localhost:3000/menu", {
          name: this.menuName,
          branch: this.selectBranch,
        });
        if (result.status === 201) {
          this.menuName = "";
          this.$swal({
            position: "center-center",
            title: "Your Menu Created",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getAllMenus({ branchName: this.selectBranch });
        }
      } else {
        this.$swal({
          position: "center-center",
          icon: "error",
          title: "Please Enter Your Full Data",
        });
      }
    },
    changeEdit(index) {
      this.editBtn = index;
    },
    async updateMenu(index, newName) {
      if (newName !== "") {
        let result = await axios.put(`http://localhost:3000/menu/${index}`, {
          name: newName,
          branch: this.selectBranch,
        });
        if (result.status === 200) {
          this.editBtn = null;
          this.$swal({
            position: "center-center",
            title: "Your Menu Updated",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        this.$swal({
          position: "center-center",
          icon: "error",
          title: "Please Enter Your Menu",
        });
      }
    },
    deleteMenu(index, delMenu) {
      this.$swal({
        icon: "question",
        title: `Do you want to Delete ${delMenu} Menu?`,
        showCancelButton: true,
        confirmButtonText: "Save",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let result = await axios.delete(
            `http://localhost:3000/menu/${index}`
          );
          if (result.status === 200) {
            this.editBtn = null;
            this.$swal({
              position: "center-center",
              title: "Your Menu Deleted",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            this.getAllMenus({ branchName: this.selectBranch });
          }
        }
      });
    },
  },
  mounted() {
    this.getAllBranches();
  },
};
</script>

<style></style>
