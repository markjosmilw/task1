<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import useSwal from "../composables/useSwal";

const router = useRouter();

const user = ref({
  username: "",
  password: "",
});

const handleLogin = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/auth/login",
      user.value
    );
    localStorage.setItem("accessToken", res.data.accessToken);
    await useSwal("sd");
    router.push("/");
  } catch (error) {
    console.log(error.response.data.error);
  }
};
</script>
<template>
  <div class="container">
    <form class="form">
      <h1>Login</h1>
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
          @click.prevent="handleLogin"
          class="button"
          value="sign in"
        />
      </div>
    </form>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/login.scss";
</style>
