<script setup>
import { watch } from "vue";
import Navbar from "./components/navbar.vue";
import { RouterView, useRoute } from "vue-router";
import { useProfileStore } from "./store/useProfileStore";

const route = useRoute();
const store = useProfileStore();

watch(route, () => {
  store.fetch();
  var timer = setInterval(function () {
    store.fetch();
    const time = store.getTimeRemaining;
    if (time === 0) {
      clearInterval(timer);
      store.profileInfo = {};
    }
  }, 5000);
});
</script>

<template>{{  }}
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
