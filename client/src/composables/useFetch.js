import { ref } from "vue";
import axios from "axios";

export async function fetch() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const res = await axios.post(`${import.meta.env.VITE_SERVER}/api/jwt`, {
      accessToken: accessToken,
    });
    return res.data;
  }
  return;
}

















//not using yet
export function useValidate() {
  const user = ref({});
  async function fetch() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const res = await axios.post(`${import.meta.env.VITE_SERVER}/api/jwt`, {
        accessToken: accessToken,
      });
      user.value = res.data;
    }
  }
  fetch();
  return user;
}
