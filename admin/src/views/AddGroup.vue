<template>
  <section>
    <div class="container">
      <h2 class="title">Group</h2>
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
          <div class="form-group">
            <label for="group">Group Name</label>
            <input
              type="text"
              class="form-control"
              id="group"
              placeholder="Enter Group Name Please"
              v-model="groupName"
            />
          </div>
          <div class="d-grid mt-3">
            <button class="btn btn-success" @click="saveGroup()">Save</button>
          </div>
          <table class="table text-center mt-4 shadow">
            <thead class="table-dark">
              <tr>
                <th>ID</th>
                <th>Group</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(group, i) in allGroups" :key="i">
                <td>{{ group.id }}</td>
                <td>
                  <span v-if="editBtn !== group.id">{{ group.name }}</span>
                  <input
                    type="text"
                    v-if="editBtn === group.id"
                    v-model="group.name"
                  />
                </td>
                <td>
                  <button
                    class="btn btn-warning"
                    v-if="editBtn !== group.id"
                    @click="changeEdit(group.id)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-success btn-sm"
                    v-if="editBtn === group.id"
                    @click="updateGroup(group.id, group.name)"
                  >
                    Save
                  </button>
                  <button
                    class="btn btn-danger btn-sm ms-1"
                    v-if="editBtn === group.id"
                    @click="deleteGroup(group.id, group.name)"
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
  name: "AddGroup",
  data() {
    return {
      selectBranch: "",
      selectMenu: "",
      groupName: "",
      editBtn: null,
    };
  },
  computed: {
    ...mapState(["allBranches", "allMenus", "allGroups"]),
  },
  methods: {
    ...mapMutations(["getAllBranches", "getAllMenus", "getAllGroups"]),
    async saveGroup() {
      if (
        this.groupName != "" &&
        this.selectBranch != "" &&
        this.selectMenu != ""
      ) {
        let result = await axios.post("http://localhost:3000/group", {
          name: this.groupName,
          menu: this.selectMenu,
          branch: this.selectBranch,
        });
        if (result.status === 201) {
          this.groupName = "";
          this.$swal({
            position: "center-center",
            title: "Your Group Created",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getAllGroups({
            branchName: this.selectBranch,
            menuName: this.selectMenu,
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
        let result = await axios.put(`http://localhost:3000/group/${index}`, {
          name: newName,
          menu: this.selectMenu,
          branch: this.selectBranch,
        });
        if (result.status === 200) {
          this.editBtn = null;
          this.$swal({
            position: "center-center",
            title: "Your Group Updated",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        this.$swal({
          position: "center-center",
          icon: "error",
          title: "Please Enter Your Group",
        });
      }
    },
    deleteGroup(index, delGroup) {
      this.$swal({
        icon: "question",
        title: `Do you want to Delete ${delGroup} Group?`,
        showCancelButton: true,
        confirmButtonText: "Save",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let result = await axios.delete(
            `http://localhost:3000/group/${index}`
          );
          if (result.status === 200) {
            this.editBtn = null;
            this.$swal({
              position: "center-center",
              title: "Your Group Deleted",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            this.getAllGroups({
              branchName: this.selectBranch,
              menuName: this.selectMenu,
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
