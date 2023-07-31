<script setup>
import { ref } from "vue";
import axios from "axios";
import {useSwal} from "../composables/useSwal";
import { useRouter } from "vue-router";

const router = useRouter();

const user = ref({
  username: "",
  password: "",
});

const err = ref("");

const handleReg = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/auth/register",
      user.value
    );
    err.value = "";
    const ok = await useSwal(res.data.response);
    if (ok) router.push("/login");
  } catch (error) {
    err.value = error.response.data.error;
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
        <label for="password">Password</label>
        <input type="password" v-model="user.password" />
      </div>
      <p class="errMessage">
        <span>{{ err }}</span>
      </p>
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
