<script setup>
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";

const router = new useRoute();

const handleLogout = () => {
  localStorage.removeItem("accessToken");
  router.push('/register')
}
</script>
<template>
  <div class="header">
    <RouterLink to="/">Home</RouterLink>
    <div class="nav">
      <RouterLink to="/register">Register</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink @click="handleLogout" to="/">Logout</RouterLink>
      <!-- <RouterLink to="/profile">Profile</RouterLink> -->
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/navbar.scss";
</style>
