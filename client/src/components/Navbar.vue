<script setup>
import { ref, onMounted } from "vue";
import { fetch } from "../composables/useFetch";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import useSwal from "../composables/useSwal";

onMounted(async () => {
  refresh();
});

async function refresh() {
  const r = await fetch();
  user.value = r;
}

const router = useRouter();
const user = ref([]);

const handleLogout = async () => {
  const ok = await useSwal("Logged out succesfully");
  localStorage.removeItem("accessToken");
  user.value = [];
  refresh();
  router.push("/login");
};
</script>
<template>
  <div class="header">
    <RouterLink to="/">Home</RouterLink>
    <div class="nav">
      <RouterLink v-if="!user" to="/register">Register</RouterLink>
      <RouterLink v-if="!user" to="/login">Login</RouterLink>
      <RouterLink v-if="user && user.role == 0" to="/profile"
        >Profile</RouterLink
      >
      <RouterLink v-if="user" @click="handleLogout" to="/">Logout</RouterLink>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/navbar.scss";
</style>
