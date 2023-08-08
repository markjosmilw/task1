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
const pageCount = ref(0);
const profileInfo = ref({});
const searchQuery = ref("");
const itemsPerPage = ref(10);
const currentPage = ref(1);
const currentSearchPage = ref(1);
const isSearching = ref(false);


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
      `${import.meta.env.VITE_SERVER}/api/admin/infos/page/${
        currentPage.value
      }`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    users.value = res.data.response;
    pageCount.value = res.data.pageCount;

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

const fetchInfosBySearch = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return;
  }
  try {
    if (!searchQuery.value) {
      return;
    }

    const res = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/admin/infos/${searchQuery.value}=${
        currentSearchPage.value
      }`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    isSearching.value = true;
    users.value = res.data.response;
    console.log(res.data);
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

watch(currentPage, async () => {
  fetchInfos();
});

watch(currentSearchPage, async () => {
  fetchInfosBySearch();
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
    {{ isSearching }}
    <div class="landing">
      <div class="tableContainer">
        <div></div>
        <div v-if="!editState">
          <div class="tableHeader">
            <h1>Data table</h1>
            <div>
              <label for="searchInput">Search:</label>
              <input type="text" v-model="searchQuery" />
              <button @click="fetchInfosBySearch">&#x1F50E;&#xFE0E;</button>
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
            <tr v-for="(info, index) in users" :key="info.userId">
              <td>
                {{
                  isSearching
                    ? currentSearchPage === 1
                      ? ++index
                      : ++index + itemsPerPage * currentSearchPage
                    : currentPage === 1
                    ? ++index
                    : ++index + itemsPerPage * currentPage
                }}
              </td>
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
          <div v-if="!isSearching" class="pagination">
            <button @click="currentPage -= 1">Previous</button>
            <span>Page {{ currentPage }} of {{ pageCount }} pages </span>
            <button @click="currentPage++">
              Next
            </button>
          </div>
          <div v-else class="pagination">
            <button @click="currentSearchPage -= 1">Previous</button>
            <span>Page {{ currentSearchPage }} of {{ pageCount }} pages </span>
            <button @click="currentSearchPage++">Next</button>
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
            <button @click.prevent="editState = !editState" class="return">
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
