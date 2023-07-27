<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="header">
    <RouterLink to="/">Home</RouterLink>
    <div class="nav">
      <RouterLink to="/register">Register</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/navbar.scss";
</style>
