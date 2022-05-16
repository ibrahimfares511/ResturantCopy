import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Branch from "../views/AddBranch.vue";
import AddMenu from "../views/AddMenu.vue";
import AddGroup from "../views/AddGroup.vue";
import AddSubGroup from "../views/AddSubGroup.vue";
import AddItem from "../views/AddItem.vue";
import AddTables from "../views/AddTables.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/branch",
    name: "Branch",
    component: Branch,
  },
  {
    path: "/add-menu",
    name: "AddMenu",
    component: AddMenu,
  },
  {
    path: "/add-group",
    name: "AddGroup",
    component: AddGroup,
  },
  {
    path: "/add-subgroup",
    name: "AddSubGroup",
    component: AddSubGroup,
  },
  {
    path: "/add-item",
    name: "AddItem",
    component: AddItem,
  },
  {
    path: "/add-table",
    name: "AddTables",
    component: AddTables,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
