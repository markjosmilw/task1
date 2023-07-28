<script setup>
import { ref } from "vue";
import axios from "axios";

const user = ref([]);
const infos = ref([]);
const accessToken = ref("");

const fetch = async () => {
  accessToken.value = localStorage.getItem("accessToken");
  if (accessToken.value) {
    const res = await axios.post("http://localhost:8080/api/jwt", {
      accessToken: accessToken.value,
    });
    user.value = res.data;

    const res2 = await axios.get(
      `http://localhost:8080/api/infos/${user.value.id}`
    );
    user.value = res2.data.response;
    infos.value = res2.data.response;
  }
};

fetch();
</script>
<template>
  <div class="container">
    <div class="card">
      <img src="../assets/profile.jpg" style="width: 100%" />
      <p>User ID: {{ user.userId }}</p>
      <h2>Personal Information</h2>
      <p>First name: {{ user.firstName }}</p>
      <p>Last name: {{ user.lastName }}</p>
      <p>Age: {{ user.age }}</p>
      <p>Gender: {{ user.gender }}</p>
      <p>City: {{ user.city }}</p>
      <h2>Contact Information</h2>
      <p>Email: {{ user.email }}</p>
      <p>Contact #: {{ user.phone }}</p>
      <p><button>Edit your profile</button></p>
    </div>
  </div>
</template>
<style scoped>
.container {
  height: 90vh;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
}

.title {
  color: grey;
  font-size: 18px;
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover,
a:hover {
  opacity: 0.7;
}
</style>
