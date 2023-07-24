<script setup>
import { ref } from "vue";
import axios from "axios";
import { object, string, number } from "yup";
import { useRouter } from "vue-router";
import swal from "sweetalert";

const router = useRouter();

const info = ref({
  name: "",
  age: "",
  address: "",
});

const infoSchema = object({
  name: string().required().min(3, "name must be atleast 3 characters"),
  age: number()
    .required()
    .positive()
    .integer()
    .max(120, "please enter your real age"),
  address: string().required().min(5, "address must be atleast 5 characters"),
});

const handleInfo = async () => {
  let yup;
  try {
    yup = await infoSchema.validate(info.value);
    const res = await axios.post("http://localhost:9000/api/infos", info.value);
    swal({
      title: "Success",
      text: res.data.message,
      icon: "success",
    });
    router.push("/contact");
  } catch (error) {
    swal({
      title: error.name,
      text:
        (yup ? error.response.data.error : error.message) ||
        error.response.data,
      icon: "error",
    });
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
@import '../styles/form.scss'
</style>
