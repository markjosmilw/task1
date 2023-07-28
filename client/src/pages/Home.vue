<script setup>
import { ref, onMounted } from "vue";
import { fetch } from "../composables/useFetch";

const user = ref([]);

onMounted(async () => {
  const r = await fetch();
  user.value = r;
});
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
