<script setup>
import { ref } from "vue";
import axios from "axios";
import { object, string } from "yup";
import swal from "sweetalert";

const contactExist = ref(false);
const userIds = ref([]);
const contact = ref({
  userId: "",
  email: "",
  phone: "",
});

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
const contactSchema = object({
  email: string()
    .email("Must be a valid email")
    .required()
    .min(10, `"email" length must be at least 10 characters long`),
  phone: string()
    .matches(phoneRegex, "Invalid phone number")
    .required("Phone is required"),
});

const getUserIds = async () => {
  try {
    const infos = await axios.get("http://localhost:9000/api/basic");
    userIds.value = infos.data.map((info) => info.id);
  } catch (error) {
    console.log(error);
  }
};

const getUserId = async () => {
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

const handleContact = async () => {
  let yup;
  try {
    yup = await contactSchema.validate(contact.value);
    const result = await axios.post(
      "http://localhost:9000/api/contact",
      contact.value
    );
    swal({
      title: "Good job!",
      text: result.data.message,
      icon: "success",
    });
    getUserId();
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

const updateContact = async () => {
  let yup;
  try {
    yup = await contactSchema.validate(contact.value);
    const result = await axios.put(
      "http://localhost:9000/api/contact",
      contact.value
    );
    swal({
      title: "Success",
      text: result.data.message,
      icon: "success",
    });
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

getUserIds();
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <h1>CONTACT INFO</h1>
    <form>
      <label for="userId">User ID</label>
      <select v-model="contact.userId" @change="getUserId">
        <option disabled value="">Please select your User ID</option>
        <option v-for="id in userIds">{{ id }}</option>
      </select>
      <label for="email">Email</label>
      <input v-model="contact.email" type="email" placeholder="Your email.." />
      <label for="phone">Phone</label>
      <input v-model="contact.phone" type="number" placeholder="Your phone.." />
      <input
        type="submit"
        :disabled="!contact.email || !contact.phone"
        :class="contact.email && contact.phone ? 'd' : ''"
        :value="contactExist?'Update':'Add'"
        @click.prevent="contactExist ? updateContact() : handleContact()"
      />
    </form>
  </div>
</template>

<style scoped lang="scss">
@import '../styles/form.scss'
</style>