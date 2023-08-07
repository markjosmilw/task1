<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useProfileStore } from "../store/useProfileStore";

const router = useRouter();
const store = useProfileStore();

const user = ref({
  username: "",
  password: "",
});

const err = ref("");

const handleLogin = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER}/api/users/login`,
      user.value
    );
    localStorage.setItem("accessToken", res.data.accessToken);
    err.value = "";
    router.push("/");
  } catch (error) {
    err.value = error.response.data.error;
  }
  store.fetch();
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
        <label for="password">Password</label>
        <input type="password" v-model="user.password" />
      </div>
      <p class="errMessage">
        <span>{{ err }}</span>
      </p>
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
