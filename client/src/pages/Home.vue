<script setup>
import { useProfileStore } from "../store/useProfileStore";
const store = useProfileStore();
</script>
<template>
  <div class="container">
    <div class="landing">
      <h1>
        Hello,
        {{
          store.getTimeRemaining
            ? store.getProfileInfo.firstName
              ? store.getProfileInfo.firstName+'!'
              : "please update your profile."
            : "visitor!"
        }}
      </h1>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/home.scss";
</style>
