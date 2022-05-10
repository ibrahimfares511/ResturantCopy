<template>
  <div class="navbar">
    <nav id="main-nav">
      <ul>
        <li data-nav-custom-content>
          <div>Some custom content</div>
        </li>
        <li>
          <router-link :to="{ name: 'Home' }"> Home </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Branch' }"> Branch </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'AddMenu' }"> Menu </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'AddGroup' }"> Group </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'AddSubGroup' }"> SubGroup </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'AddItem' }"> Item </router-link>
        </li>
      </ul>
    </nav>
    <button class="toggle">Click</button>
  </div>
</template>

<script>
import hcOffcanvasNav from "hc-offcanvas-nav";
import "hc-offcanvas-nav/dist/hc-offcanvas-nav.css";
export default {
  name: "Navbar",
  mounted() {
    new hcOffcanvasNav("#main-nav", {
      disableAt: false,
      customToggle: ".toggle",
      levelSpacing: 40,
      levelTitles: true,
      levelTitleAsBack: true,
      pushContent: "#app",
      removeOriginalNav: true,
    });
  },
};
</script>

<style scoped>
.navbar {
  padding: 0;
}
.toggle {
  position: fixed;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
}
</style>
