<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { object, string } from "yup";
import { useSwal } from "../composables/useSwal";

onMounted(() => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    router.push("/");
    return;
  }
});

const router = useRouter();

const user = ref({
  username: "",
  password: "",
});

const err = ref("");

const userSchema = object({
  username: string().min(5).required(),
  password: string().min(5).required(),
});

const handleReg = async () => {
  try {
    await userSchema.validate(user.value);
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER}/api/auth/register`,
      user.value
    );
    //createe a separate file for axios
    //case sensity
    //decoding in middleware for all axios request
    err.value = "";
    const ok = await useSwal(res.data.response);
    if (ok) router.push("/login");
  } catch (error) {
    err.value =
      error.name === "ValidationError"
        ? error.message
        : error.response.data.error;
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
