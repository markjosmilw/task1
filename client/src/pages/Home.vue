<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import _ from "lodash";
import swal from "sweetalert";
import { fetch } from "../composables/useFetch";
import { useHandlePersonal, useHandleContact } from "../composables/useForms";

const user = ref([]);
const infos = ref([]);
const info = ref({
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  city: "",
  email: "",
  phone: "",
});

const editState = ref(false);

onMounted(async () => {
  user.value = await fetch();
});

watch(editState, () => {
  fetchInfos();
});

const fetchInfos = async () => {
  const res = await axios.get("http://localhost:8080/api/infos");
  infos.value = _.filter(
    res.data.response,
    (info) => info.email !== null && info.firstName !== null
  );
};

const deleteUser = async (uid) => {
  try {
    const e = await swal(`Are you sure you want to delete this user?`, {
      buttons: ["no", "yes"],
    });
    if (e) {
      const res = await axios.delete(`http://localhost:8080/api/infos/${uid}`);
      swal("Deleted!", res.data.message, "success");
    }
  } catch (error) {
    console.log(error);
  }
};

const editUser = (uid) => {
  editState.value = true;
  const cont = _.find(infos.value, { userId: uid });
  const { password, ...others } = cont;
  info.value = others;
};

fetchInfos();
</script>
<template>
  <div class="container">
    <div class="landing">
      <h1>Hello {{ user ? user.username : "visitor" }}</h1>
      <div v-if="user && user.role === 1" class="tableContainer">
        <div v-if="!editState">
          <h1>Data table</h1>
          <table id="customers">
            <tr>
              <th>#</th>
              <th>Full name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>City</th>
              <th>Email</th>
              <th>Phone#</th>
              <th>Actions</th>
            </tr>
            <tr v-for="(info, index) in infos">
              <td>{{ ++index }}</td>
              <td>
                {{
                  `${_.upperFirst(info.firstName)} ${_.upperFirst(
                    info.lastName
                  )}`
                }}
              </td>
              <td>{{ info.age }}</td>
              <td>{{ info.gender }}</td>
              <td>{{ _.upperFirst(info.city) }}</td>
              <td>{{ info.email }}</td>
              <td>{{ info.phone }}</td>
              <td>
                <a @click="editUser(info.userId)">Edit</a> |
                <a @click="deleteUser(info.userId)">Delete</a>
              </td>
            </tr>
          </table>
        </div>
        <div class="editForm" v-if="editState">
          <form class="form">
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
          <form v-if="editState" class="form">
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
            <button @click.prevent="editState = !editState" class="return">
              return
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/home.scss";
</style>
