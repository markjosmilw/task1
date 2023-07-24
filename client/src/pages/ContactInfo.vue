<script setup>
import { ref } from "vue";
import axios from "axios";
import { object, string } from "yup";
import { onMounted } from 'vue'
import swal from "sweetalert";
import _ from "lodash";

onMounted(() => {
  fetch();
})

const contactExists = ref(false);

const all = ref([])

const contact = ref({
  userId: "",
  email: "",
  phone: "",
});

const fetch = async () => {
  try {
    const response = await axios.get("http://localhost:9000/api/infos");
    all.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

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

const getContact = async () => {
  const cont = _.find(all.value.contacts, {
    userId: parseInt(contact.value.userId),
  });
  if (!cont) {
    contact.value.email = "";
    contact.value.phone = "";
    contactExists.value = false;
    return;
  }
  contact.value.email = cont.email;
  contact.value.phone = cont.phone;
  contactExists.value = true;
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
      title: "Success",
      text: result.data.message,
      icon: "success",
    });
    contactExists.value = !contactExists.value;
    fetch()
  } catch (error) {
    swal({
      title: error.name,
      text:
        (yup ? error.response.data.error : error.message) ||
        error.response.data || '404 not found',
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


</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <h1>CONTACT INFO</h1>
    <form>
      <label for="userId">Name</label>
      <select v-model="contact.userId" @change="getContact">
        <option disabled value="">Please select your name</option>
        <option v-for="(info, index) in all.infos" :key="index" :value="info.id">{{ info.name }}</option>
      </select>
      <label for="email">Email</label>
      <input v-model="contact.email" type="email" placeholder="Your email.." />
      <label for="phone">Phone</label>
      <input v-model="contact.phone" type="number" placeholder="Your phone.." />
      <input
        type="submit"
        :disabled="!contact.email || !contact.phone"
        :class="contact.email && contact.phone ? 'd' : ''"
        :value="contactExists ? 'Update' : 'Add'"
        @click.prevent="contactExists ? updateContact() : handleContact()"
      />
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "../styles/form.scss";
</style>
