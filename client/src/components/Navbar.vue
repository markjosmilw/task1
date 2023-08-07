<script setup>
import { ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useProfileStore } from "../store/useProfileStore";

const isAdmin = ref(false);
const store = useProfileStore();
const router = useRouter();
const route = useRoute();

watch(route, () => {
  isAdmin.value = localStorage.getItem('admin')
});

const handleLogout = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("admin");
  store.timeRemaining = 0;
  router.push("/login");
};
</script>
<template>
  <div class="header">
    <RouterLink :to="isAdmin ? '/admin' : '/'">Home</RouterLink>
    <div class="nav">
      <RouterLink to="/about">About us</RouterLink>
      <RouterLink to="/contact">Contact us</RouterLink>
      <RouterLink v-if="!store.getTimeRemaining" to="/register"
        >Register</RouterLink
      >
      <RouterLink v-if="!store.getTimeRemaining" to="/login">Login</RouterLink>
      <RouterLink v-if="store.getTimeRemaining && !isAdmin" to="/profile"
        >Profile</RouterLink
      >
      <RouterLink v-if="store.getTimeRemaining" @click="handleLogout" to="/"
        >Logout {{ store.getTimeRemaining }}</RouterLink
      >
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/navbar.scss";
</style>
