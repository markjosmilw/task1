<script setup>
import { onMounted, ref } from "vue";
import { fetch } from "../composables/useFetch";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref({});
const form = ref({
  title: "",
  message: "",
});

onMounted(async () => {
  user.value = await fetch();
  if (!user.value) router.push("/");
});

async function sendForm() {
  console.log("form sent");
}
</script>

<template>
  <div class="container">
    {{ user }}
    <form class="contactForm">
      <h1>Contact form</h1>
      <div>
        <label for="title">Title</label>
        <input v-model="form.title" type="text" />
      </div>
      <div>
        <label for="message">Message</label>
        <textarea v-model="form.message" rows="4" cols="50"></textarea>
      </div>
      <div>
        <input
          type="submit"
          @click.prevent="sendForm"
          class="button"
          value="submit"
        />
      </div>
    </form>
  </div>
</template>

<stype lang="scss" scoped>
@import "../styles/contact.scss";
</stype>
