<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAdminStore } from "../store/useAdminStore";

const store = useAdminStore();

const router = useRouter();

const admin = ref({
  username: "",
  password: "",
});

const err = ref("");

const handleLogin = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER}/api/admin/login`,
      admin.value
    );
    localStorage.setItem("accessToken", res.data.accessToken);
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
