<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { fetch } from "../composables/useFetch";
mounted(() => {
  console.log('mounted');
}),
</script>


<template>
  <div class="container">
    <div class="landing">
      <h1>Hi</h1>
      <!-- <h1>Hello {{ user.username ? user.username : "visitor" }}</h1> -->
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/home.scss";
</style>
