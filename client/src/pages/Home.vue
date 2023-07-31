<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import _ from 'lodash'
import { fetch } from "../composables/useFetch";

onMounted(async () => {
  const r = await fetch();
  user.value = r;
});

const user = ref([]);
const infos = ref([]);

const fetchInfos = async () => {
  const res = await axios.get("http://localhost:8080/api/infos");
  console.log(res.data.response);
  console.log(_.filter(infos.value, (i) => {
    i.firstName === null
  }));
  infos.value = res.data.response;
};

fetchInfos();
</script>
<template>
  <div class="container">
    <div class="landing">
      <h1>Hello {{ user.username ? user.username : "visitor" }}</h1>
      <div v-if="user.role === 1" class="tableContainer">
        <h1>A Fancy Table</h1>
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
            <td>{{`${_.upperFirst(info.firstName)} ${_.upperFirst(info.lastName)}`}}</td>
            <td>{{info.age}}</td>
            <td>{{ info.gender }}</td>
            <td>{{ _.upperFirst(info.city) }}</td>
            <td>{{ info.email }}</td>
            <td>{{ info.phone }}</td>
            <td><a>Edit</a> | <a>Delete</a></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/home.scss";
</style>
