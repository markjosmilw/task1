import { defineStore } from "pinia";
import axios from "axios";
import { useSwal } from "../composables/useSwal";
import { yupProfileSchema } from "../services/useYup";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profileInfo: {},
    timeRemaining: 0,
  }),
  getters: {
    getProfileInfo: (state) => state.profileInfo,
    getTimeRemaining: (state) => state.timeRemaining,
  },
  actions: {
    async fetch() {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        this.personalInfo = {};
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/infos/profile`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        this.profileInfo = res.data.response;
        this.timeRemaining = res.data.timeRemaining;
      } catch (error) {
        useSwal(error.response.data.error, error.response.data.title);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("admin");
      }
    },
    async updateProfile(profileInfo) {
      const { userId, firstName, lastName, age, gender, city, email, phone } =
        profileInfo;
      const accessToken = localStorage.getItem("accessToken");
      const admin = localStorage.getItem("admin");
      if (!accessToken) {
        return;
      }
      try {
        await yupProfileSchema(profileInfo);
        await axios.put(
          admin
            ? `${import.meta.env.VITE_SERVER}/api/admin/infos/profile`
            : `${import.meta.env.VITE_SERVER}/api/infos/profile`,
          {
            userId: userId,
            firstName: firstName.toLowerCase(),
            lastName: lastName.toLowerCase(),
            age: age,
            gender: gender,
            city: city,
            email: email,
            phone: phone,
          },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        useSwal("profile updated successfully");
      } catch (error) {
        useSwal(
          error.name == "AxiosError"
            ? error.response.data.error
            : error.message,
          error.name
        );
      }
    },
  },
});
