<script setup>
import { watch } from "vue";
import Navbar from "./components/Navbar.vue";
import { RouterView, useRoute } from "vue-router";
import { useProfileStore } from "./store/useProfileStore";

const route = useRoute();
const store = useProfileStore();

watch(route, () => {
  store.fetch();
  var timer = setInterval(function () {
    const time = store.getTimeRemaining;
    store.fetch();
    if (time === 0) {
      clearInterval(timer);
      store.profileInfo = {};
    }
  }, 1000);
});
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
