<template>
  <div class="setting" :class="isOpen ? 'open' : ''">
    <button class="switch" @click="isOpen = !isOpen">gear</button>
    <div class="setting-content">
      <div class="add-holdes">
        <div class="form-group">
          <label for="hole-name">Hole Name</label>
          <input
            type="text"
            class="form-control"
            id="hole-name"
            placeholder="Enter Hole Name Please"
            v-model="holeName"
            @keyup.enter="saveHole()"
          />
        </div>
        <div class="d-grid mt-3">
          <button class="btn btn-success" @click="saveHole()">Save</button>
        </div>
      </div>
      <hr />
      <div class="add-tables">
        <div class="form-group">
          <label for="num-tables">Tables Count</label>
          <input
            type="number"
            class="form-control"
            id="num-tables"
            placeholder="Enter Tables Count Please"
            v-model="tablesCount"
          />
        </div>
        <div class="form-group">
          <label for="scema">Scema</label>
          <input
            type="text"
            class="form-control"
            id="scema"
            placeholder="Enter Scema Please"
            v-model="scema"
          />
        </div>
        <div class="form-group">
          <input type="checkbox" v-model="circle" id="circle" />
          <label for="circle">Circle</label>
        </div>
        <div class="d-grid mt-3">
          <button class="btn btn-success" @click="saveTables()">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SettingTables",
  props: ["branch", "holes", "holeSelected", "tables"],
  data() {
    return {
      holeName: "",
      tablesCount: "",
      scema: null,
      circle: "",
      isOpen: false,
    };
  },
  methods: {
    async saveHole() {
      if (this.holeName !== "" && this.branch !== "") {
        let result = await axios.post(`http://localhost:3000/holes`, {
          name: this.holeName,
          branch: this.branch,
        });
        if (result.status === 201) {
          this.holes.push(result.data);
          this.$swal({
            position: "center-center",
            title: `${this.holeName} Is Created`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.holeName = "";
        }
      } else {
        this.$swal({
          position: "center-center",
          icon: "error",
          title: "Please Enter Your Full Data",
        });
      }
    },
    async saveTables() {
      if (this.tablesCount !== "" && this.holeSelected !== null) {
        let result = null;
        for (let i = 1; i <= this.tablesCount; i++) {
          let tablesLength = this.tables.length + 1;
          result = await axios.post(
            `http://localhost:3000/tables?hole=${this.holeSelected}`,
            {
              name: `${this.scema || "Table"}-${
                tablesLength < 10 ? "0" + tablesLength : tablesLength
              }`,
              hole: this.holeSelected,
              circle: this.circle,
            }
          );
          if (result.status === 201) {
            this.tables.push(result.data);
          }
        }
        if (result.status === 201) {
          this.$swal({
            position: "center-center",
            title: `${this.tablesCount} Tables Created`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.tablesCount = "";
          this.scema = null;
          this.circle = false;
          this.isOpen = false;
        }
      } else {
        this.$swal({
          position: "center-center",
          icon: "error",
          title: "Please Select Hole",
        });
      }
    },
  },
};
</script>

<style scoped>
.setting {
  position: fixed;
  top: 0;
  bottom: 0;
  right: -250px;
  background: #336ca6;
  width: 250px;
  padding: 10px;
  z-index: 3;
  transition: all 0.3s ease-in-out;
}
.setting.open {
  right: 0px;
}
.setting .switch {
  position: absolute;
  top: 50%;
  left: -35px;
  transform: translateY(-50%);
  width: 35px;
  height: 35px;
  text-align: end;
  background: #336ca6;
  color: #fff;
  border-radius: 10px 0 0 10px;
  border: 1px solid #336ca6;
}
.setting label {
  color: #fff;
}
</style>
