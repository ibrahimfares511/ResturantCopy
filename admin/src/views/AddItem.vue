<template>
  <section>
    <div class="container">
      <h2 class="title">Item</h2>
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="row align-items-center">
            <div class="col-md-6">
              <!-- Brnach -->
              <select
                class="form-select mb-3"
                v-model="selectBranch"
                @change="
                  getAllMenus({ branchName: selectBranch }),
                    getAllGroups({
                      branchName: selectBranch,
                      menuName: selectMenu,
                    }),
                    getAllSubGroups({
                      branchName: selectBranch,
                      menuName: selectMenu,
                      groupName: selectGroup,
                    })
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
              <!-- Menu -->
              <select
                class="form-select mb-3"
                v-model="selectMenu"
                @change="
                  getAllGroups({
                    branchName: selectBranch,
                    menuName: selectMenu,
                  }),
                    getAllSubGroups({
                      branchName: selectBranch,
                      menuName: selectMenu,
                      groupName: selectGroup,
                    })
                "
              >
                <option disabled value="">Please select Menu</option>
                <option
                  v-for="(menu, i) in allMenus"
                  :key="i"
                  :value="menu.name"
                >
                  {{ menu.name }}
                </option>
              </select>
              <!-- Group -->
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
              <!-- SubGroup -->
              <select
                class="form-select mb-3"
                v-model="selectSubGroup"
                @change="getItems()"
              >
                <option disabled value="">Please select SubGroup</option>
                <option
                  v-for="(subgroup, i) in allSubGroups"
                  :key="i"
                  :value="subgroup.name"
                >
                  {{ subgroup.name }}
                </option>
              </select>
              <!-- Item Name -->
              <div class="form-group">
                <label for="item-name">Item Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="item-name"
                  placeholder="Enter Item Name Please"
                  v-model="itemName"
                />
              </div>
              <!-- Item Price -->
              <div class="form-group">
                <label for="item-price">Item Price</label>
                <input
                  type="text"
                  class="form-control"
                  id="item-price"
                  placeholder="Enter Item Price Please"
                  v-model="itemPrice"
                />
              </div>
            </div>
            <div class="col-md-6">
              <!-- Item Image -->
              <div class="form-group text-center mt-3">
                <input
                  type="file"
                  accept="image/*"
                  @change="uploadImage($event)"
                  id="item-image"
                  class="d-none"
                />
                <label
                  for="item-image"
                  class="label-img"
                  :class="[uploadpath != null ? 'fill' : '']"
                  :style="{
                    'background-image': `url(${uploadpath})`,
                  }"
                ></label>
              </div>
            </div>
            <div class="d-grid mt-3">
              <button class="btn btn-success" @click="saveItem()">Save</button>
            </div>
          </div>
          <table class="table text-center mt-4 shadow align-middle">
            <thead class="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>img</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in allItems" :key="i">
                <td>{{ item.id }}</td>
                <td>
                  <span v-if="editBtn !== item.id">{{ item.name }}</span>
                  <input
                    type="text"
                    v-if="editBtn === item.id"
                    v-model="item.name"
                  />
                </td>
                <td>
                  <span v-if="editBtn !== item.id">{{ item.price }}</span>
                  <input
                    type="number"
                    v-if="editBtn === item.id"
                    v-model="item.price"
                  />
                </td>

                <td>
                  <img
                    :src="require(`@/assets/images/${item.img}`)"
                    :alt="item.name"
                    v-if="editBtn !== item.id"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    @change="uploadImage($event)"
                    id="update-image"
                    class="d-none"
                    v-if="editBtn === item.id"
                  />
                  <label
                    v-if="editBtn === item.id"
                    for="update-image"
                    class="label-img"
                    :class="[updatepath != null ? 'fill' : '']"
                    :style="{
                      'background-image': `url('${updatepath}')`,
                    }"
                  ></label>
                </td>
                <td>
                  <button
                    class="btn btn-warning"
                    v-if="editBtn !== item.id"
                    @click="changeEdit(item.id, item.img)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-success btn-sm"
                    v-if="editBtn === item.id"
                    @click="updateItem(item.id, item.name, item.price)"
                  >
                    Save
                  </button>
                  <button
                    class="btn btn-danger btn-sm ms-1"
                    v-if="editBtn === item.id"
                    @click="deletItem(item.id, item.name)"
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
  name: "AddItem",
  data() {
    return {
      selectBranch: "",
      selectMenu: "",
      selectGroup: "",
      selectSubGroup: "",
      itemName: "",
      itemPrice: "",
      itemImg: "",
      updateImg: "",
      allItems: [],
      uploadpath: null,
      updatepath: null,
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
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (input) => {
        console.log();
        if (e.target.id === "item-image") {
          this.uploadpath = input.target.result;
          this.itemImg = image.name;
        } else if (e.target.id === "update-image") {
          this.updatepath = input.target.result;
          this.updateImg = image.name;
        }
      };
    },
    async saveItem() {
      if (
        this.selectBranch != "" &&
        this.selectMenu != "" &&
        this.selectGroup != "" &&
        this.selectSubGroup != "" &&
        this.itemName != "" &&
        this.itemPrice != "" &&
        this.itemImg != ""
      ) {
        let result = await axios.post("http://localhost:3000/Item", {
          name: this.itemName,
          price: this.itemPrice,
          img: this.itemImg,
          subgroup: this.selectSubGroup,
          group: this.selectGroup,
          menu: this.selectMenu,
          branch: this.selectBranch,
        });
        if (result.status === 201) {
          this.itemName = "";
          this.itemPrice = "";
          this.uploadpath = null;
          document.getElementById("item-image").value = "";
          this.$swal({
            position: "center-center",
            title: "Your Item Created",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getItems();
        }
      } else {
        this.$swal({
          position: "center-center",
          icon: "error",
          title: "Please Enter Your Full Data",
        });
      }
    },
    async getItems() {
      let result = await axios.get(
        `http://localhost:3000/Item?branch=${this.selectBranch}&menu=${this.selectMenu}&subgroup=${this.selectSubGroup}`
      );
      if (result.status === 200) {
        this.allItems = result.data;
      }
    },
    changeEdit(index, img) {
      this.editBtn = index;
      this.updatepath = require(`../assets/images/${img}`);
      this.updateImg = img;
    },
    async updateItem(index, newName, newPrice) {
      if (newName !== "" && newPrice !== "") {
        let result = await axios.put(`http://localhost:3000/Item/${index}`, {
          name: newName,
          price: newPrice,
          img: this.updateImg,
          subgroup: this.selectSubGroup,
          group: this.selectGroup,
          menu: this.selectMenu,
          branch: this.selectBranch,
        });
        if (result.status === 200) {
          this.editBtn = null;
          this.$swal({
            position: "center-center",
            title: "Your Item Updated",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.updatepath = null;
          this.updateImg = "";
          this.getItems();
        }
      } else {
        this.$swal({
          position: "center-center",
          icon: "error",
          title: "Please Enter Your Full Data",
        });
      }
    },
    deletItem(index, item) {
      this.$swal({
        icon: "question",
        title: `Do you want to Delete ${item} Item?`,
        showCancelButton: true,
        confirmButtonText: "Save",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let result = await axios.delete(
            `http://localhost:3000/Item/${index}`
          );
          if (result.status === 200) {
            this.editBtn = null;
            this.updatepath = null;
            this.updateImg = "";
            this.$swal({
              position: "center-center",
              title: "Your Item Deleted",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            this.getItems();
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

<style scoped>
.label-img {
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
  position: relative;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}

.label-img::after {
  content: "+";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 5em;
  text-align: center;
  color: #ddd;
}
.label-img.fill::after {
  content: "";
}
td img,
td .label-img {
  width: 100px;
  height: 100px;
}
</style>
