<script setup>
import { ref } from "vue";
import axios from "axios";
import { object, string, number } from "yup";
import { useRouter } from "vue-router";
import _ from "lodash";
import useSwal from "../composables/useSwal";

const router = useRouter();

const info = ref({
  name: "",
  age: "",
  address: "",
});

const infoSchema = object({
  name: string()
    .required()
    .min(3, "Your name must be atleast 3 characters long."),
  age: number()
    .required()
    .positive()
    .integer()
    .max(120, "Please enter your real age."),
  address: string()
    .required()
    .min(5, "Address must be atleast 5 characters long."),
});

const handleInfo = async () => {
  let yup;
  try {
    yup = await infoSchema.validate(info.value);
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/infos`, {
      name: _.lowerCase(info.value.name),
      age: info.value.age,
      address: _.lowerCase(info.value.address),
    });
    useSwal(res.data.message);
    router.push("/contact");
  } catch (error) {
    useSwal(yup ? error.response.data.error : error.message, error.name);
  }
};
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <h1>BASIC INFO</h1>
    <form>
      <label for="name">Name</label>
      <input v-model="info.name" type="text" placeholder="Your name.." />
      <label for="age">Age</label>
      <input v-model="info.age" type="number" placeholder="Your age.." />
      <label for="address">Address</label>
      <input v-model="info.address" type="text" placeholder="Your address.." />
      <input
        type="submit"
        :disabled="!info.name || !info.age || !info.address"
        :class="info.name && info.age && info.address ? 'd' : ''"
        value="Submit"
        @click.prevent="handleInfo"
      />
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "../styles/form.scss";
</style>
