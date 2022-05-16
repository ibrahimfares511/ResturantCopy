<template>
  <section class="tables" @click="delTable = null">
    <div class="container">
      <h2 class="title">Tables</h2>
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <select
            class="form-select mb-3"
            v-model="selectBranch"
            @change="getHoles()"
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
        </div>
      </div>
      <nav class="holesNav">
        <ul class="list-unstyled">
          <li
            v-for="(hole, i) in holes"
            :key="i"
            :class="selectHole == hole.id ? 'active' : ''"
            @click="changeActive(hole.id), getTables()"
          >
            {{ hole.name }}
          </li>
        </ul>
      </nav>
      <div class="all-tables">
        <span class="hole-del" @click="deleteHole()">Delete</span>
        <div
          class="resTable"
          v-for="(table, i) in tables"
          :key="i"
          :class="table.circle ? 'rounded-circle' : ''"
          @click.stop="delTable = table.id"
        >
          <h5>{{ table.name }}</h5>
          <button
            class="table-del"
            v-show="delTable == table.id"
            @click.stop="deleteTable(table.id, table.name)"
          >
            Delete
          </button>
        </div>
      </div>
      <SettingTables
        :branch="selectBranch"
        :holes="holes"
        :holeSelected="selectHole"
        :tables="tables"
      />
    </div>
  </section>
</template>

<script>
import axios from "axios";
import SettingTables from "@/components/tables/SettingTables.vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "AddTables",
  components: {
    SettingTables,
  },
  data() {
    return {
      selectBranch: "",
      holes: [],
      selectHole: null,
      tables: [],
      delTable: null,
    };
  },
  computed: {
    ...mapState(["allBranches"]),
  },
  methods: {
    ...mapMutations(["getAllBranches"]),
    async getHoles() {
      let result = await axios.get(
        `http://localhost:3000/holes?branch=${this.selectBranch}`
      );
      if (result.status === 200) {
        this.holes = result.data;
        this.selectHole = result.data.length > 0 ? result.data[0].id : null;
        this.getTables();
      }
    },
    deleteHole() {
      this.$swal({
        icon: "question",
        title: `Do you want to Delete this Hole?`,
        showCancelButton: true,
        confirmButtonText: "Save",
      }).then(async (result) => {
        if (result.isConfirmed) {
          for (let i = 0; i < this.tables.length; i++) {
            await axios.delete(
              `http://localhost:3000/tables/${this.tables[i].id}`
            );
            this.tables.pop();
          }

          let result = await axios.delete(
            `http://localhost:3000/holes/${this.selectHole}`
          );
          if (result.status === 200) {
            this.$swal({
              position: "center-center",
              title: "Your Hole Deleted",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            this.getHoles();
          }
        }
      });
    },
    changeActive(index) {
      this.selectHole = index;
    },
    async getTables() {
      let result = await axios.get(
        `http://localhost:3000/tables?hole=${this.selectHole}`
      );
      if (result.status === 200) {
        this.tables = result.data;
      }
    },
    deleteTable(index, Tabledel) {
      this.$swal({
        icon: "question",
        title: `Do you want to Delete ${Tabledel} Table?`,
        showCancelButton: true,
        confirmButtonText: "Save",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let result = await axios.delete(
            `http://localhost:3000/tables/${index}`
          );
          if (result.status === 200) {
            this.$swal({
              position: "center-center",
              title: "Your Table Deleted",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            this.getTables();
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

<style>
.holesNav ul {
  display: flex;
  gap: 1px;
  margin-bottom: 0;
}
.holesNav ul li {
  background: #ddd;
  text-align: center;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
  user-select: none;
}
.holesNav ul li.active {
  background: #336ca6;
  color: white;
}
.all-tables {
  position: relative;
  min-height: calc(100vh - 136px);
  background: #336ca6;
  margin-bottom: 20px;
  display: flex;
  align-content: flex-start;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  padding: 15px 0;
}
.all-tables .hole-del {
  position: absolute;
  top: -44px;
  right: 0;
  background: var(--bs-danger);
  color: white;
  padding: 10px;
  z-index: 2;
}
.all-tables .resTable {
  position: relative;
  width: 120px;
  height: 120px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: 1px 1px 10px #132;
  color: #336ca6;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
}
.all-tables .resTable .table-del {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bs-danger);
  color: white;
  padding: 10px;
  border: none;
}
</style>
