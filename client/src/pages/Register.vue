<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useSwal } from "../composables/useSwal";
import { yupUserSchema } from "../services/useYup";
import { useProfileStore } from "../store/useProfileStore";

const router = useRouter();
const store = useProfileStore();

const err = ref("");
const user = ref({
  username: "",
  password: "",
});

const handleReg = async () => {
  try {
    await yupUserSchema(user.value);
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER}/api/users/register`,
      user.value
    );
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
