<script setup>
import { ref, watch, computed } from "vue";
import axios from "axios";
import _ from "lodash";
import swal from "sweetalert";
import { useSwal } from "../composables/useSwal";
import { useProfileStore } from "../store/useProfileStore";

const store = useProfileStore();
const editState = ref(false);
const users = ref([]);
const profileInfo = ref({});
const searchQuery = ref("");
const itemsPerPage = ref(10); // Number of items to display per page
const currentPage = ref(1); // Current page

const displayedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return users.value.slice(startIndex, endIndex);
});

const deleteUser = async (userId) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return;
  }
  try {
    const confirm = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (confirm) {
      const res = await axios.patch(
        `${import.meta.env.VITE_SERVER}/api/admin/users/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      useSwal(res.data.response);
      fetchInfos();
    }
  } catch (error) {
    console.log(error);
  }
};

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
    currentPage.value = 1;
  } catch (error) {
    console.log(error);
  }
};

watch(searchQuery, async (search) => {
  if (!search) await fetchInfos();
});

watch(editState, async () => {
  fetchInfos();
});

function editUser(info) {
  editState.value = !editState.value;
  profileInfo.value.userId = info.userId;
  profileInfo.value.firstName = info.firstName;
  profileInfo.value.lastName = info.lastName;
  profileInfo.value.age = info.age;
  profileInfo.value.gender = info.gender;
  profileInfo.value.city = info.city;
  profileInfo.value.email = info.email;
  profileInfo.value.phone = info.phone;
}

fetchInfos();
</script>

<template>
  <div class="container">
    <div class="landing">
      <div class="tableContainer">
        <div></div>
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
              <th>ID</th>
              <th>Full name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>City</th>
              <th>Email</th>
              <th>Phone#</th>
              <th>Actions</th>
            </tr>
            <tr v-for="(info, index) in displayedUsers" :key="info.userId">
              <td>{{ (index += currentPage * itemsPerPage - 9) }}</td>
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
          <div v-if="users.length > 0" class="pagination">
            <button @click="currentPage -= 1" :disabled="currentPage === 1">
              Previous
            </button>
            <span
              >Page {{ currentPage }} of page
              {{
                (users.length - (users.length % 10)) / 10 +1
              }}
              </span
            >
            <button
              @click="currentPage += 1"
              :disabled="currentPage * itemsPerPage >= users.length"
            >
              Next
            </button>
          </div>
        </div>
        <div class="editForm" v-if="editState">
          <form class="form">
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
            <button
              @click.prevent="editState = !editState && fetchInfos()"
              class="return"
            >
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
