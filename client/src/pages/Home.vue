<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import _ from "lodash";
import swal from "sweetalert";
import { fetch } from "../composables/useFetch";

onMounted(async () => {
  const r = await fetch();
  user.value = r;
});

const user = ref([]);
const infos = ref([]);

const fetchInfos = async () => {
  const res = await axios.get("http://localhost:8080/api/infos");
  infos.value = _.filter(
    res.data.response,
    (info) => info.email !== null && info.firstName !== null
  );
};

const deleteUser = async (info) => {
  try {
    const e = await swal(`Are you sure you want to delete ${info.firstName}?`, {
      buttons: ["no", "yes"],
    });
    if (e) {
      const res = await axios.delete(`http://localhost:8080/api/infos/${info.userId}`);
      swal("Deleted!", res.data.message, "success");
    }
  } catch (error) {
    console.log(error);
  }
};

fetchInfos();
</script>
<template>
  <div class="container">
    <div class="landing">
      <h1>Hello {{ user ? user.username : "visitor" }}</h1>
      <div v-if="user && user.role === 1" class="tableContainer">
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
                `${_.upperFirst(info.firstName)} ${_.upperFirst(info.lastName)}`
              }}
            </td>
            <td>{{ info.age }}</td>
            <td>{{ info.gender }}</td>
            <td>{{ _.upperFirst(info.city) }}</td>
            <td>{{ info.email }}</td>
            <td>{{ info.phone }}</td>
            <td><a @click="editUser(info.userId)">Edit</a> | <a @click="deleteUser(info)">Delete</a></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/home.scss";
</style>
