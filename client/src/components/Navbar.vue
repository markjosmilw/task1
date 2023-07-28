<script setup>
import { ref } from "vue";
import axios from "axios";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import useWarning from "../composables/useSwal";

const router = useRouter();
const user = ref([]);
const accessToken = ref("");

const fetch = async () => {
  accessToken.value = localStorage.getItem("accessToken");
  if (accessToken.value) {
    const res = await axios.post("http://localhost:8080/api/jwt", {
      accessToken: accessToken.value,
    });
    return (user.value = res.data);
  }
  user.value = [];
};

const handleLogout = async () => {
  const ok = await useWarning("This will log out your account!");
  localStorage.removeItem("accessToken");
  fetch();
  router.push("/login");
};

fetch();
</script>
<template>
  <div class="header">
    <RouterLink to="/">Home</RouterLink>
    <div class="nav">
      <RouterLink v-if="!user.username" to="/register">Register</RouterLink>
      <RouterLink v-if="!user.username" to="/login">Login</RouterLink>
      <RouterLink v-if="user.username && user.role == 0" to="/profile"
        >Profile</RouterLink
      >
      <RouterLink v-if="user.username" @click="handleLogout" to="/"
        >Logout</RouterLink
      >
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/navbar.scss";
</style>
