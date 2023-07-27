<script setup>
import Navbar from "./components/Navbar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="wrapper">
    <Navbar />
    <RouterView class="container" />
  </div>
</template>

<style scoped>
.wrapper {
  margin-left: 400px;
  margin-right: 400px;
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
