<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import { useHandlePersonal, useHandleContact } from "../composables/useForms";

const user = ref({});
const info = ref({
  userId: "",
  firstName: "",
  lastName: "",
  age: "",
  city: "",
  email: "",
  phone: "",
});
//
const accessToken = ref("");
const editProfile = ref(false);

watch(editProfile, () => {
  fetch();
});

const fetch = async () => {
  accessToken.value = localStorage.getItem("accessToken");
  if (accessToken.value) {
    const res = await axios.post("http://localhost:8080/api/jwt", {
      accessToken: accessToken.value,
    });
    user.value = res.data;
    info.value.userId = user.value.id;
    const res2 = await axios.get(
      `http://localhost:8080/api/infos/${user.value.id}`
    );
    info.value = res2.data.response;
  }
};

fetch();
</script>
<template>
  <div class="container">
    <form v-if="editProfile" class="form">
      <h1>Personal Information</h1>
      <div>
        <label for="firstName">First Name</label>
        <input type="text" v-model="info.firstName" />
      </div>
      <div>
        <label for="lastName">Last Name</label>
        <input type="text" v-model="info.lastName" />
      </div>
      <div>
        <label for="age">Age</label>
        <input type="number" v-model="info.age" />
      </div>
      <div>
        <label for="gender">Gender</label>
        <input type="text" v-model="info.gender" />
      </div>
      <div>
        <label for="city">City</label>
        <input type="text" v-model="info.city" />
      </div>
      <div>
        <input
          type="submit"
          @click.prevent="useHandlePersonal(info)"
          class="button"
          value="save"
        />
      </div>
    </form>
    <div v-else class="card">
      <img src="../assets/profile.jpg" style="width: 100%" />
      <p>User ID: {{ user.id }}</p>
      <h2>Personal Information</h2>
      <p>First name: {{ info.firstName }}</p>
      <p>Last name: {{ info.lastName }}</p>
      <p>Age: {{ info.age }}</p>
      <p>Gender: {{ info.gender }}</p>
      <p>City: {{ info.city }}</p>
      <h2>Contact Information</h2>
      <p>Email: {{ info.email }}</p>
      <p>Contact #: {{ info.phone }}</p>
      <p>
        <button @click="editProfile = !editProfile">Edit your profile</button>
      </p>
    </div>
    <form v-if="editProfile" class="form">
      <h1>Contact Information</h1>
      <div>
        <label for="firstName">Email</label>
        <input type="text" v-model="info.email" />
      </div>
      <div>
        <label for="lastName">Phone</label>
        <input type="text" v-model="info.phone" />
      </div>
      <div>
        <input
          type="submit"
          @click.prevent="useHandleContact(info)"
          class="button"
          value="save"
        />
      </div>
      <button @click.prevent="editProfile = !editProfile" class="return">
        return
      </button>
    </form>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/profile.scss";
</style>
