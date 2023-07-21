<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
  <ul>
    <li><RouterLink to="/">HOME</RouterLink></li>
    <li><RouterLink to="/basic">BASIC FORM</RouterLink></li>
    <li><RouterLink to="/contact">CONTACT FORM</RouterLink></li>
  </ul>
</template>
<style scoped lang="scss">
@import '../styles/navbar.scss'
</style>
