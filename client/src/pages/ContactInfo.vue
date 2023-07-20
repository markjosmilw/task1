<script setup>
import { ref } from "vue";
import axios from "axios";
import { object, string } from "yup";
import swal from "sweetalert";

const contact = ref({
  userId: "0",
  email: "",
  phone: "",
});
const contactExist = ref(false);
const userIds = ref([]);
const fetchBasic = async () => {
  try {
    const infos = await axios.get("http://localhost:9000/api/basic");
    userIds.value = infos.data.map((info) => info.id);
  } catch (error) {}
};

const fet = async () => {
  const res = await axios.get(
    `http://localhost:9000/api/contact/${contact.value.userId}`
  );
  if (!res.data) {
    contact.value.email = "";
    contact.value.phone = "";
    contactExist.value = false;
    return;
  }
  contact.value.email = res.data.email;
  contact.value.phone = res.data.phone;
  contactExist.value = true;
};

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
const contactSchema = object({
  email: string()
    .email("Must be a valid email")
    .required()
    .min(10, `"email" length must be at least 10 characters long`),
  phone: string()
    .matches(phoneRegex, "Invalid phone")
    .required("Phone is required"),
});

const handleForm2 = async () => {
  let er;
  try {
    er = await contactSchema.validate(contact.value);
    const result = await axios.post(
      "http://localhost:9000/api/contact",
      contact.value
    );
    swal({
      title: "Good job!",
      text: result.data.message,
      icon: "success",
    });
    fet();
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
    console.log(error);
    swal({
      title: error.name,
      text: error.response.data.error,
      icon: "error",
    });
  }
};
fetchBasic();
const updateForm2 = async () => {
  console.log("updated contacts");
};
</script>
<template>
  {{ userIds }} {{ contact.userId }}
  <div style="display: flex; flex-direction: column; align-items: center">
    <h1>CONTACT INFO</h1>
    <form>
      <select v-model="contact.userId" @change="fet">
        <option disabled value="">Please select one userId</option>
        <option v-for="id in userIds">{{ id }}</option>
      </select>
      <label for="email">Email</label>
      <input v-model="contact.email" type="email" placeholder="Your email.." />
      <label for="phone">Phone</label>
      <input v-model="contact.phone" type="number" placeholder="Your phone.." />
      <input
        type="submit"
        :value="contactExist ? 'Update' : 'Add'"
        @click.prevent="contactExist ? updateForm2() : handleForm2()"
      />
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
