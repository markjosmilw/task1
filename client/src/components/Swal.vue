<template>
  <div></div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from "vue";
import Swal from "sweetalert";

const { title, text, icon } = defineProps(["title", "text", "icon"]);
const showSwal = ref(false);

onMounted(() => {
  showSwal.value = true;
});

watch(showSwal, (newValue) => {
  if (newValue === false) {
    emit("swal-closed");
  }
});

function showSwalDialog() {
  const swalOptions = {
    title: title.value,
    text: text.value,
    icon: icon.value,
  };

  Swal.fire(swalOptions).then(() => {
    showSwal.value = false;
  });
}
</script>
