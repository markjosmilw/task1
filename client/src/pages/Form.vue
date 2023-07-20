<script setup>
import { ref } from "vue";
import axios from "axios";
import { object, string, number } from "yup";
import swal from "sweetalert";

const nextForm = ref(false);
const info = ref({
  name: "",
  age: "",
  address: "",
});
const contact = ref({
  userId: "0",
  email: "",
  phone: "",
});
const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
const infoSchema = object({
  name: string().required().min(3, "name must be atleast 3 characters"),
  age: number()
    .required()
    .positive()
    .integer()
    .max(120, "please enter your real age"),
  address: string().required().min(5, "address must be atleast 5 characters"),
});
const contactSchema = object({
  email: string()
    .email("Must be a valid email")
    .required()
    .min(10, `"email" length must be at least 10 characters long`),
  phone: string()
    .matches(phoneRegex, "Invalid phone")
    .required("Phone is required"),
});
const handleForm1 = async () => {
  try {
    await infoSchema.validate(info.value);
    swal({
      title: "Good job!",
      text: "Let`s proceed to form 2",
      icon: "success",
    });
    nextForm.value = !nextForm.value;
  } catch (error) {
    swal({
      title: error.name,
      text: error.message,
      icon: "error",
    });
  }
};
const handleForm2 = async () => {
  let er;
  let result;
  try {
    er = await contactSchema.validate(contact.value);
    const res = await axios.post("http://localhost:9000/api/infos", info.value);
    contact.value.userId = res.data.userId;
    result = await axios.post(
      "http://localhost:9000/api/contact",
      contact.value
    );
    swal({
      title: "Good job!",
      text: result.data.message,
      icon: "success",
    });
    nextForm.value = !nextForm.value;
  } catch (error) {
    if (!er) {
      //frontend err
      console.log(error);
      swal({
        title: error.name,
        text: error.message,
        icon: "error",
      });
      return;
    }
    //backend error
    console.log(error.response.data.error);
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
    <h1>{{ nextForm ? "CONTACT INFO" : "BASIC INFO" }}</h1>
    <form v-if="!nextForm">
      <label for="name">Name</label>
      <input v-model="info.name" type="text" placeholder="Your name.." />
      <label for="age">Age</label>
      <input v-model="info.age" type="number" placeholder="Your age.." />
      <label for="address">Address</label>
      <input v-model="info.address" type="text" placeholder="Your address.." />
      <input type="submit" value="Next" @click.prevent="handleForm1" />
    </form>
    <form v-else>
      <label for="email">Email</label>
      <input v-model="contact.email" type="email" placeholder="Your email.." />
      <label for="phone">Phone</label>
      <input v-model="contact.phone" type="number" placeholder="Your phone.." />
      <input type="submit" @click.prevent="handleForm2" />
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
