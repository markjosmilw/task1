<script setup>
import { ref } from "vue";
import axios from "axios";
<<<<<<< HEAD
import { onMounted } from 'vue'
=======
import _ from "lodash";
>>>>>>> b11382dc135b50919fc7ac137d22f17e80362705

onMounted(() => {
  fetch();
})

const mergedInfos = ref([]);
const searchQuery = ref("");

const fetch = async () => {
  try {
    const response = await axios.get("http://localhost:9000/api/infos");
    mergedInfos.value = response.data.merge;
  } catch (error) {
    console.log(error);
  }
};

const handleSearch = () => {
  const search = searchQuery.value.toLowerCase();
  if (search === "") {
    fetch();
  } else {
    mergedInfos.value = mergedInfos.value.filter(
      (info) =>
        info.name.toLowerCase().includes(search) ||
        info.address.toLowerCase().includes(search) ||
        info.email.toLowerCase().includes(search)
    );
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
            <label for="searchInput">Search:</label>
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
          </tr>
<<<<<<< HEAD
          <tr v-for="(info, index) in mergedInfos" :key="info.id">
=======
          <tr v-for="(info, index) in infos" :key="index">
>>>>>>> b11382dc135b50919fc7ac137d22f17e80362705
            <td>{{ ++index }}</td>
            <td>{{ _.capitalize(info.name) }}</td>
            <td>{{ info.age }}</td>
            <td>{{ _.capitalize(info.address) }}</td>
            <td>{{ info.email }}</td>
            <td>{{ info.phone }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../styles/home.scss";
</style>
