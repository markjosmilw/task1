<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import { useHandlePersonal, useHandleContact } from "../composables/useForms";
import { useRouter } from "vue-router";

import { useProfileStore } from "../store/useProfileStore";
const store = useProfileStore();

// onMounted(() => {
//   fetch();
// });

// const router = useRouter();
// const user = ref({});
const personalInfo = ref({});
const contactInfo = ref({});

// const accessToken = ref("");
const editProfile = ref(false);

watch(editProfile, () => {
  personalInfo.value = store.getProfileInfo;
  contactInfo.value = store.getContactInfo;
});

function handleProfileForm() {
  // const accessToken = localStorage.getItem("accessToken");
  // if (!accessToken) {
  //   return;
  // }
  // try {
  // } catch (error) {}
}

// const fetch = async () => {
//   accessToken.value = localStorage.getItem("accessToken");
//   // if (!accessToken.value) {
//   //   router.push("/login");
//   //   return;
//   // }
//   const res = await axios.post(`${import.meta.env.VITE_SERVER}/api/jwt`, {
//     accessToken: accessToken.value,
//   });
//   user.value = res.data;
//   const userInfo = await axios.get(
//     `${import.meta.env.VITE_SERVER}/api/infos/${user.value.id}`
//   );
//   info.value = userInfo.data.response;
//   // const res2 = await axios.get(
//   //   `${import.meta.env.VITE_SERVER}/api/infos/${user.value.id}`
//   // );
//   // info.value = res2.data.response;
//   // info.value.userId = user.value.id;
// };
</script>
<template>
  <div class="container">
    <form v-if="editProfile" class="form">
      <h1>Profile Information</h1>
      <div>
        <label for="firstName">First Name</label>
        <input type="text" v-model="personalInfo.firstName" />
      </div>
      <div>
        <label for="lastName">Last Name</label>
        <input type="text" v-model="personalInfo.lastName" />
      </div>
      <div>
        <label for="age">Age</label>
        <input type="number" v-model="personalInfo.age" />
      </div>
      <div>
        <label for="gender">Gender</label>
        <select v-model="personalInfo.gender">
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </div>
      <div>
        <label for="city">City</label>
        <input type="text" v-model="personalInfo.city" />
      </div>
      <div>
        <label for="firstName">Email</label>
        <input type="text" v-model="contactInfo.email" />
      </div>
      <div>
        <label for="lastName">Phone</label>
        <input type="text" v-model="contactInfo.phone" />
      </div>
      <button @click.prevent="editProfile = !editProfile" class="return">
        return
      </button>
      <div>
        <input
          type="submit"
          @click.prevent="store.updateProfile(personalInfo, contactInfo)"
          class="button"
          value="update"
        />
      </div>
    </form>
    <div v-else class="card">
      <img src="../assets/profile.jpg" style="width: 100%" />
      <p>User ID: {{ store.getProfileInfo.userId }}</p>
      <h2>Personal Information</h2>
      <p>First name: {{ store.getProfileInfo.firstName }}</p>
      <p>Last name: {{ store.getProfileInfo.lastName }}</p>
      <p>Age: {{ store.getProfileInfo.age }}</p>
      <p>Gender: {{ store.getProfileInfo.gender }}</p>
      <p>City: {{ store.getProfileInfo.city }}</p>
      <h2>Contact Information</h2>
      <p>Email: {{ store.getContactInfo.email }}</p>
      <p>Contact #: {{ store.getContactInfo.phone }}</p>
      <p>
        <button @click="editProfile = !editProfile">Edit your profile</button>
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/profile.scss";
</style>
