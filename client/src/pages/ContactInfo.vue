<script setup>
import { ref } from "vue";
import axios from "axios";
import { object, string } from "yup";
import swal from "sweetalert";
import _ from "lodash";

const contactExist = ref(false);

const contacts = ref([]);

const userIds = ref([]);
const contact = ref({
  userId: "",
  email: "",
  phone: "",
});

const infos = ref({});

const fetch = async () => {
  try {
    const response = await axios.get("http://localhost:9000/api/infos");
    contacts.value = response.data.contacts;
    infos.value = response.data.infos;
    const pp = response.data.infos.map((info) => {
      return info.id;
    });
    userIds.value = pp;
  } catch (error) {}
};
fetch();

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
  contact.value.userId = infos.value.id.id
  const cont = _.find(contacts.value, {
    userId: parseInt(contact.value.userId),
  });
  if (!cont) {
    contact.value.email = "";
    contact.value.phone = "";
    contactExist.value = false;
    return;
  }
  contact.value.email = cont.email;
  contact.value.phone = cont.phone;
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
    contactExist.value = !contactExist.value;
    console.log(contacts.value);
    
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
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <h1>CONTACT INFO</h1>
    <form>
      <label for="userId">Name</label>
      <select v-model="infos.id" @change="getContact">
        <option disabled value="">Please select your name</option>
        <option v-for="id in infos" v-bind:value="id">{{ id.name }}</option>
      </select>
      <label for="email">Email</label>
      <input v-model="contact.email" type="email" placeholder="Your email.." />
      <label for="phone">Phone</label>
      <input v-model="contact.phone" type="number" placeholder="Your phone.." />
      <input
        type="submit"
        :disabled="!contact.email || !contact.phone"
        :class="contact.email && contact.phone ? 'd' : ''"
        :value="contactExist ? 'Update' : 'Add'"
        @click.prevent="contactExist ? updateContact() : handleContact()"
      />
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "../styles/form.scss";
</style>
