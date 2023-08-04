import { defineStore } from "pinia";
import axios from "axios";
import { useSwal } from "../composables/useSwal";
import { yupPersonalSchema, yupContactSchema } from "../services/useYup";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    personalInfo: {},
    contactInfo: {},
    timeRemaining: 0,
  }),
  getters: {
    getPersonalInfo: (state) => state.personalInfo,
    getContactInfo: (state) => state.contactInfo,
    getFirstName: (state) => state.personalInfo.firstName,
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
          `${import.meta.env.VITE_SERVER}/api/infos/personal`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        this.personalInfo = res.data.profile;
        this.contactInfo = res.data.contact;
        this.timeRemaining = res.data.timeRemaining;
      } catch (error) {
        useSwal(error.response.data.error, error.response.data.title);
        localStorage.removeItem("accessToken");
      }
    },
    async updateProfile(personalInfo, contactInfo) {
      const { userId, firstName, lastName, age, gender, city } = personalInfo;
      const { email, phone } = contactInfo;
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return;
      }
      try {
        await yupPersonalSchema(personalInfo);
        await yupContactSchema(contactInfo);
        await axios.put(
          `${import.meta.env.VITE_SERVER}/api/infos/personal`,
          {
            userId: userId,
            firstName: firstName.toLowerCase(),
            lastName: lastName.toLowerCase(),
            age: age,
            gender: gender,
            city: city,
          },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        await axios.put(
          `${import.meta.env.VITE_SERVER}/api/infos/contact`,
          {
            userId: userId,
            email: email.toLowerCase(),
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
