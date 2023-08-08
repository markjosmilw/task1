<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const err = ref("");
const admin = ref({
  username: "",
  password: "",
});

const handleLogin = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER}/api/admin/login`,
      admin.value
    );
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("admin", true);
    err.value = "";
    router.push("/admin");
  } catch (error) {
    err.value = error.response.data.error;
    console.log(error);
  }
};
</script>
<template>
  <div class="container">
    <form class="form">
      <h1>Admin Login</h1>
      <div>
        <label for="username">Username</label>
        <input type="text" v-model="admin.username" />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="admin.password" />
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
