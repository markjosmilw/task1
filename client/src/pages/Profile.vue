<script setup>
import { ref, watch } from "vue";
import { useProfileStore } from "../store/useProfileStore";

const store = useProfileStore();
const personalInfo = ref({});
const contactInfo = ref({});
const editProfile = ref(false);

watch(editProfile, () => {
  personalInfo.value = store.getPersonalInfo;
  contactInfo.value = store.getContactInfo;
});
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
      <div>
        <input
          type="submit"
          @click.prevent="store.updateProfile(personalInfo, contactInfo)"
          class="button"
          value="update"
        />
      </div>
      <button @click.prevent="editProfile = !editProfile" class="return">
        return
      </button>
    </form>
    <div v-else class="card">
      <img src="../assets/profile.jpg" style="width: 100%" />
      <p><span>User ID:</span> {{ store.getPersonalInfo.userId }}</p>
      <h2>Personal Information</h2>
      <p><span>First name:</span> {{ store.getPersonalInfo.firstName }}</p>
      <p><span>Last name:</span> {{ store.getPersonalInfo.lastName }}</p>
      <p><span>Age:</span> {{ store.getPersonalInfo.age }}</p>
      <p><span>Gender:</span> {{ store.getPersonalInfo.gender }}</p>
      <p><span>City:</span> {{ store.getPersonalInfo.city }}</p>
      <h2>Contact Information</h2>
      <p><span>Email:</span> {{ store.getContactInfo.email }}</p>
      <p><span>Phone #:</span> {{ store.getContactInfo.phone }}</p>
      <p>
        <button @click="editProfile = !editProfile">Edit your profile</button>
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/profile.scss";
</style>
