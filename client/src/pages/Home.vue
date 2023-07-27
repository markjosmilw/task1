<script setup>
import { ref, onMounted, withCtx } from "vue";
import axios from "axios";
import _ from "lodash";
import swal from "sweetalert";

onMounted(() => {
  fetch();
});

const infos = ref([]);
const searchQuery = ref("");

const fetch = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/infos`
    );
    infos.value = _.filter(response.data.infos, (info) => info.email !== null);
  } catch (error) {
    console.log(error);
  }
};

const handleSearch = () => {
  const search = searchQuery.value.toLowerCase();
  if (search === "") {
    fetch();
  } else {
    infos.value = infos.value.filter(
      (info) =>
        info.name.toLowerCase().includes(search) ||
        info.address.toLowerCase().includes(search) ||
        info.email.toLowerCase().includes(search)
    );
  }
};

const handleDelete = async (uid) => {
  try {
    const e = await swal("Are you sure you want to delete this row?", {
      buttons: ["no", "yes"],
    });
    if (e) {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/infos/${uid}`);
      swal("Deleted!", res.data.message, "success");
      fetch()
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <h1>HOME</h1>
    <div style="display: flex">
      <div>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <h1>Data table</h1>
          <div>
            <label for="searchInput">&#x1F50E;&#xFE0E;Search:</label>
            <input type="text" v-model="searchQuery" @input="handleSearch" />
          </div>
        </div>
        <table id="datas">
          <tr>
            <th>NO</th>
            <th>NAME</th>
            <th>AGE</th>
            <th>ADDRESS</th>
            <th>EMAIL</th>
            <th>PHONE</th>
            <th>ACTION</th>
          </tr>
          <tr v-for="(info, index) in infos" :key="index">
            <td>{{ ++index }}</td>
            <td>{{ _.capitalize(info.name) }}</td>
            <td>{{ info.age }}</td>
            <td>{{ _.truncate(_.capitalize(info.address)) }}</td>
            <td>{{ info.email }}</td>
            <td>{{ info.phone }}</td>
            <td>
              <a
                @click="handleDelete(info.userId)"
                style="cursor: pointer; color: rgb(230, 27, 27)"
                >Delete</a
              >
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../styles/home.scss";
</style>
