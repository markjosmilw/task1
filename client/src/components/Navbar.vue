<script setup>
import { ref, watch } from "vue";
import { fetch } from "../composables/useFetch";
import { RouterLink } from "vue-router";
import { useRouter, useRoute } from "vue-router";

import { useProfileStore } from "../store/useProfileStore";
const store = useProfileStore();
// const route = useRoute();

// watch(route, (route) => {
//   refresh();
// });

// async function refresh() {
//   const r = await fetch();
//   user.value = r;
// }

// var timer = setInterval(function () {
//   const time = store.getTimeRemaining;
//   store.fetch();
//   console.log(time);
//   if (time === 0) {
//     clearInterval(timer);
//     store.profileInfo = {};
//     router.push("/login");
//   }
// }, 1000);

const router = useRouter();
// const user = ref([]);

const handleLogout = async () => {
  localStorage.removeItem("accessToken");
  store.timeRemaining = 0;
  router.push("/login");
};
</script>
<template>
  <div class="header">
    <RouterLink to="/">Home</RouterLink>
    <div class="nav">
      <RouterLink to="/about">About us</RouterLink>
      <RouterLink to="/contact">Contact us</RouterLink>
      <RouterLink v-if="!store.getTimeRemaining" to="/register"
        >Register</RouterLink
      >
      <RouterLink v-if="!store.getTimeRemaining" to="/login">Login</RouterLink>
      <RouterLink v-if="store.getTimeRemaining" to="/profile">Profile</RouterLink>
      <RouterLink v-if="store.getTimeRemaining" @click="handleLogout" to="/"
        >Logout {{ store.getTimeRemaining }}</RouterLink
      >
      <!-- <span v-if="store.getFirstName">{{ store.getTimeRemaining }}</span> -->
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/navbar.scss";
</style>
