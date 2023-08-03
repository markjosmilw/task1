<script setup>
import { watch } from "vue";
import Navbar from "./components/Navbar.vue";
import { RouterView, useRoute } from "vue-router";
import { useProfileStore } from "./store/useProfileStore";

const store = useProfileStore();
store.fetch();
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
