<template>
  <section>
    <div class="container">
      <h2 class="title">Sub Group</h2>
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <select
            class="form-select mb-3"
            v-model="selectBranch"
            @change="
              getAllMenus({ branchName: selectBranch }),
                getAllGroups({ branchName: selectBranch, menuName: selectMenu })
            "
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
          <select
            class="form-select mb-3"
            v-model="selectMenu"
            @change="
              getAllGroups({ branchName: selectBranch, menuName: selectMenu })
            "
          >
            <option disabled value="">Please select Menu</option>
            <option v-for="(menu, i) in allMenus" :key="i" :value="menu.name">
              {{ menu.name }}
            </option>
          </select>
          <select
            class="form-select mb-3"
            v-model="selectGroup"
            @change="
              getAllSubGroups({
                branchName: selectBranch,
                menuName: selectMenu,
                groupName: selectGroup,
              })
            "
          >
            <option disabled value="">Please select Group</option>
            <option
              v-for="(group, i) in allGroups"
              :key="i"
              :value="group.name"
            >
              {{ group.name }}
            </option>
          </select>
          <div class="form-group">
            <label for="subgroup">Sub Group Name</label>
            <input
              type="text"
              class="form-control"
              id="subgroup"
              placeholder="Enter Sub Group Name Please"
              v-model="subGroupName"
            />
          </div>
          <div class="d-grid mt-3">
            <button class="btn btn-success" @click="saveSubGroup()">
              Save
            </button>
          </div>
          <table class="table text-center mt-4 shadow">
            <thead class="table-dark">
              <tr>
                <th>ID</th>
                <th>SubGroup</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(subgroup, i) in allSubGroups" :key="i">
                <td>{{ subgroup.id }}</td>
                <td>
                  <span v-if="editBtn !== subgroup.id">{{
                    subgroup.name
                  }}</span>
                  <input
                    type="text"
                    v-if="editBtn === subgroup.id"
                    v-model="subgroup.name"
                  />
                </td>
                <td>
                  <button
                    class="btn btn-warning"
                    v-if="editBtn !== subgroup.id"
                    @click="changeEdit(subgroup.id)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-success btn-sm"
                    v-if="editBtn === subgroup.id"
                    @click="updateGroup(subgroup.id, subgroup.name)"
                  >
                    Save
                  </button>
                  <button
                    class="btn btn-danger btn-sm ms-1"
                    v-if="editBtn === subgroup.id"
                    @click="deleteGroup(subgroup.id, subgroup.name)"
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
  name: "AddSubGroup",
  data() {
    return {
      selectBranch: "",
      selectMenu: "",
      selectGroup: "",
      subGroupName: "",
      editBtn: null,
    };
  },
  computed: {
    ...mapState(["allBranches", "allMenus", "allGroups", "allSubGroups"]),
  },
  methods: {
    ...mapMutations([
      "getAllBranches",
      "getAllMenus",
      "getAllGroups",
      "getAllSubGroups",
    ]),
    async saveSubGroup() {
      if (
        this.subGroupName != "" &&
        this.selectBranch != "" &&
        this.selectMenu != "" &&
        this.selectGroup != ""
      ) {
        let result = await axios.post("http://localhost:3000/subgroup", {
          name: this.subGroupName,
          group: this.selectGroup,
          menu: this.selectMenu,
          branch: this.selectBranch,
        });
        if (result.status === 201) {
          this.subGroupName = "";
          this.$swal({
            position: "center-center",
            title: "Your SubGroup Created",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getAllSubGroups({
            branchName: this.selectBranch,
            menuName: this.selectMenu,
            groupName: this.selectGroup,
          });
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
    async updateGroup(index, newName) {
      if (newName !== "") {
        let result = await axios.put(
          `http://localhost:3000/subgroup/${index}`,
          {
            name: newName,
            group: this.selectGroup,
            menu: this.selectMenu,
            branch: this.selectBranch,
          }
        );
        if (result.status === 200) {
          this.editBtn = null;
          this.$swal({
            position: "center-center",
            title: "Your SubGroup Updated",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        this.$swal({
          position: "center-center",
          icon: "error",
          title: "Please Enter Your SubGroup",
        });
      }
    },
    deleteGroup(index, delSubGroup) {
      this.$swal({
        icon: "question",
        title: `Do you want to Delete ${delSubGroup} SubGroup?`,
        showCancelButton: true,
        confirmButtonText: "Save",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let result = await axios.delete(
            `http://localhost:3000/subgroup/${index}`
          );
          if (result.status === 200) {
            this.editBtn = null;
            this.$swal({
              position: "center-center",
              title: "Your SubGroup Deleted",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            this.getAllSubGroups({
              branchName: this.selectBranch,
              menuName: this.selectMenu,
              groupName: this.selectGroup,
            });
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
