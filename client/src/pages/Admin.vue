<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import _ from "lodash";

const editState = ref(false);
const searchQuery = ref("");
const users = ref([]);
const profile = ref({
  userId
})

const fetchInfos = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return;
  }
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/admin/infos`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    users.value = res.data.response;
  } catch (error) {
    console.log(error);
  }
};

const handleSearch = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return;
  }
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/admin/infos/${searchQuery.value}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    users.value = res.data.response;
  } catch (error) {
    console.log(error);
  }
};

watch(searchQuery, async (search) => {
  if (!search) await fetchInfos();
});

function editUser(info) {
  editState.value = !editState.value;
  console.log(info);
}

const handleUpdateProfile = async () => {};

fetchInfos();
</script>

<template>
  <div class="container">
    <div class="landing">
      <div class="tableContainer">
        <div v-if="!editState">
          <div class="tableHeader">
            <h1>Data table</h1>
            <div>
              <label for="searchInput">Search:</label>
              <input type="text" v-model="searchQuery" />
              <button @click="handleSearch">&#x1F50E;&#xFE0E;</button>
            </div>
          </div>
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
            <tr v-for="(info, index) in users">
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
                <a style="color: green" @click="editUser(info)">Edit</a>
                |
                <a style="color: red" @click="deleteUser(info.userId)"
                  >Delete</a
                >
              </td>
            </tr>
          </table>
        </div>
        <div class="editForm" v-if="editState">
          <form class="form">
            <h1>Profile Information</h1>
            <div>
              <label for="firstName">First Name</label>
              <input type="text"  />
            </div>
            <div>
              <label for="lastName">Last Name</label>
              <input type="text"  />
            </div>
            <div>
              <label for="age">Age</label>
              <input type="number" />
            </div>
            <div>
              <label for="gender">Gender</label>
              <select >
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
            <div>
              <label for="city">City</label>
              <input type="text"  />
            </div>
            <div>
              <label for="firstName">Email</label>
              <input type="text"  />
            </div>
            <div>
              <label for="lastName">Phone</label>
              <input type="text"  />
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
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/home.scss";
</style>
