import axios from "axios";
import { object, string, number } from "yup";
import { useSwal } from "../composables/useSwal";

const personalSchema = object({
  userId: number().required(),
  firstName: string().min(2).required(),
  lastName: string().min(2).required(),
  age: number().min(1).max(150).required(),
  gender: string().min(4).required(),
  city: string().min(4).required(),
});

const contactSchema = object({
  userId: number().required(),
  email: string().email().required(),
  phone: string().required().min(10).max(10),
});

export function useHandlePersonal(info) {
  async function handlePersonal() {
    try {
      await personalSchema.validate(info);
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
      useSwal(
        error.name === "ValidationError"
          ? error.message
          : error.response.data.error,
        "Update failed"
      );
    }
  }
  handlePersonal();
}

export function useHandleContact(info) {
  async function handleContact() {
    try {
      await contactSchema.validate(info);
      const res = await axios.post("http://localhost:8080/api/infos/contact", {
        userId: info.userId,
        email: info.email,
        phone: info.phone,
      });
      useSwal(res.data.response);
    } catch (error) {
      useSwal(
        error.name === "ValidationError"
          ? error.message
          : error.response.data.error,
        "Update failed"
      );
    }
  }
  handleContact();
}
