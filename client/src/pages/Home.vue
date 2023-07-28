<script setup>
import { ref } from "vue";
import axios from "axios";

const user = ref([]);
const accessToken = ref("");

const fetch = async () => {
  accessToken.value = localStorage.getItem("accessToken");
  if (accessToken.value) {
    const res = await axios.post("http://localhost:8080/api/jwt", {
      accessToken: accessToken.value,
    });
    user.value = res.data;
  }
};

fetch();
</script>
<template>
  <div class="container">
    <div class="landing">
      <h1>Hello {{ user.username ? user.username : "visitor" }}</h1>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/home.scss";
</style>
