<script setup>
import { ref } from "vue";
import axios from "axios";
import { object, string, number } from "yup";
import swal from "sweetalert";

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

const handleForm1 = async () => {
  let er;
  try {
    er = await infoSchema.validate(info.value);
    const res = await axios.post("http://localhost:9000/api/infos", info.value);
    swal({
      title: "Success",
      text: res.data.message,
      icon: "success",
    });
  } catch (error) {
    if (!er) {
      //frontend err
      console.log('frontend error');
      swal({
        title: error.name,
        text: error.message,
        icon: "error",
      });
      return;
    }
    //backend error
    console.log('backend error');
    swal({
      title: error.name,
      text: error.response.data.error,
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
      <input type="submit" value="Submit" @click.prevent="handleForm1" />
    </form>
  </div>
</template>

<style scope="">
input[type="text"],
input[type="number"],
input[type="email"],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="submit"] {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}
</style>
