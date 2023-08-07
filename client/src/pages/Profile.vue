<script setup>
import { ref, watch } from "vue";
import { useProfileStore } from "../store/useProfileStore";

const store = useProfileStore();
const profileInfo = ref({});
const editProfile = ref(false);

watch(editProfile, () => {
  profileInfo.value = store.getProfileInfo;
});

</script>
<template>
  <div class="container">
    <form v-if="editProfile" class="form">
      <h1>Profile Information</h1>
      <div>
        <label for="firstName">First Name</label>
        <input type="text" v-model="profileInfo.firstName" />
      </div>
      <div>
        <label for="lastName">Last Name</label>
        <input type="text" v-model="profileInfo.lastName" />
      </div>
      <div>
        <label for="age">Age</label>
        <input type="number" v-model="profileInfo.age" />
      </div>
      <div>
        <label for="gender">Gender</label>
        <select v-model="profileInfo.gender">
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </div>
      <div>
        <label for="city">City</label>
        <input type="text" v-model="profileInfo.city" />
      </div>
      <div>
        <label for="firstName">Email</label>
        <input type="text" v-model="profileInfo.email" />
      </div>
      <div>
        <label for="lastName">Phone</label>
        <input type="text" v-model="profileInfo.phone" />
      </div>
      <div>
        <input
          type="submit"
          @click.prevent="store.updateProfile(profileInfo)"
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
      <p><span>User ID:</span> {{ store.getProfileInfo.userId }}</p>
      <h2>Personal Information</h2>
      <p><span>First name:</span> {{ store.getProfileInfo.firstName }}</p>
      <p><span>Last name:</span> {{ store.getProfileInfo.lastName }}</p>
      <p><span>Age:</span> {{ store.getProfileInfo.age }}</p>
      <p><span>Gender:</span> {{ store.getProfileInfo.gender }}</p>
      <p><span>City:</span> {{ store.getProfileInfo.city }}</p>
      <h2>Contact Information</h2>
      <p><span>Email:</span> {{ store.getProfileInfo.email }}</p>
      <p><span>Phone #:</span> {{ store.getProfileInfo.phone }}</p>
      <p>
        <button @click="editProfile = !editProfile">Edit your profile</button>
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/profile.scss";
</style>
