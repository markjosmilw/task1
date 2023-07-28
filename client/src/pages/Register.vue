<script setup>
import { ref } from "vue";
import axios from "axios";

const user = ref({
  username: "",
  password: "",
});

const handleReg = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/auth/register",
      user.value
    );
    console.log(res.data.response);
  } catch (error) {
    console.log(error.response.data.error);
  }
};
</script>
<template>
  <div class="container">
    <form class="form">
      <h1>Registration</h1>
      <div>
        <label for="username">Username</label>
        <input type="text" v-model="user.username" />
      </div>
      <div>
        <label for="username">Password</label>
        <input type="text" v-model="user.password" />
      </div>
      <div>
        <input
          type="submit"
          @click.prevent="handleReg"
          class="button"
          value="sign up"
        />
      </div>
    </form>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/register.scss";
</style>
