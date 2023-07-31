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
const info = ref({
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  city: "",
  email: "",
  password: "",
});
const editState = ref(false);

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
      const res = await axios.delete(
        `http://localhost:8080/api/infos/${info.userId}`
      );
      swal("Deleted!", res.data.message, "success");
    }
  } catch (error) {
    console.log(error);
  }
};

const editUser = (userId) => {
  editState.value = true;
  console.log(_.filter(infos, (info) => console.log(info.userId)));
};

fetchInfos();
</script>
<template>
  <div class="container">
    <div class="landing">
      <h1>Hello {{ user ? user.username : "visitor" }}</h1>
      <div v-if="user && user.role === 1" class="tableContainer">
        <div>
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
                <a @click="deleteUser(info)">Delete</a>
              </td>
            </tr>
          </table>
        </div>
        <div v-if="editState">
          {{ info }}
        </div>
        <!-- <div class="editForm">
          <form>
            <label for="fname">First Name</label>
            <input type="text" placeholder="Your name.." />
            <label for="lname">Last Name</label>
            <input type="text" placeholder="Your last name.." />
            <label for="age">Age</label>
            <input type="number" placeholder="Your age.." />
            <label for="gender">Gender</label>
            <select>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            <label for="city">City</label>
            <input type="text" placeholder="Your city.." />
            <input type="submit" value="Submit" />
          </form>
        </div> -->
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/home.scss";
</style>
