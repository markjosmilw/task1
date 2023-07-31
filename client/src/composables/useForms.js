import axios from "axios";
import { useSwal } from "../composables/useSwal";

export function useHandlePersonal(info) {
  async function handlePersonal() {
    try {
      const res = await axios.post("http://localhost:8080/api/infos/personal", {
        userId: info.userId,
        firstName: info.firstName,
        lastName: info.lastName,
        age: info.age,
        gender: info.gender,
        city: info.city,
      });
      useSwal(res.data.response);
    } catch (error) {
      useSwal(error.response.data.error, "Update failed");
    }
  }
  handlePersonal();
}

export function useHandleContact(info) {
  async function handleContact() {
    try {
      const res = await axios.post("http://localhost:8080/api/infos/contact", {
        userId: info.userId,
        email: info.email,
        phone: info.phone,
      });
      useSwal(res.data.response);
    } catch (error) {
      useSwal(error.response.data.error, "Update failed");
    }
  }
  handleContact();
}
