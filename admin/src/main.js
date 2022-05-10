import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "normalize.css";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);

import "./assets/css/main.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
