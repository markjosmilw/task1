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
  isAdmin.value = localStorage.getItem("admin");
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
    <RouterLink
      :class="route.path === '/' ? 'active' : ''"
      :to="isAdmin ? '/admin' : '/'"
      >///</RouterLink
    >
    <div class="nav">
      <RouterLink
        :class="route.path === '/' ? 'active' : ''"
        :to="isAdmin ? '/admin' : '/'"
        >Home</RouterLink
      >
      <RouterLink :class="route.path === '/about' ? 'active' : ''" to="/about"
        >About us</RouterLink
      >
      <RouterLink
        :class="route.path === '/contact' ? 'active' : ''"
        to="/contact"
        >Contact us</RouterLink
      >
      <RouterLink
        :class="route.path === '/profile' ? 'active' : ''"
        v-if="store.getTimeRemaining && !isAdmin"
        to="/profile"
        >Profile</RouterLink
      >
    </div>
    <RouterLink v-if="store.getTimeRemaining" @click="handleLogout" to="/"
      >Logout {{ store.getTimeRemaining }}</RouterLink
    >
    <RouterLink
      :class="route.path === '/login' ? 'active' : ''"
      v-if="!store.getTimeRemaining"
      to="/login"
      >Login</RouterLink
    >
  </div>
</template>
<style scoped lang="scss">
@import "../styles/navbar.scss";
</style>
