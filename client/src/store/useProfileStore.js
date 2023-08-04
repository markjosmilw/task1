import { defineStore } from "pinia";
import axios from "axios";

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
        this.personalInfo = res.data.response;
        this.contactInfo = res.data.contact;
        this.timeRemaining = res.data.timeRemaining;
      } catch (error) {
        console.log(error.response.data.error);
        localStorage.removeItem("accessToken");
      }
    },
    async updateProfile(personalInfo, contactInfo) {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        this.personalInfo = {};
        return;
      }
      try {
        await axios.put(
          `${import.meta.env.VITE_SERVER}/api/infos/personal`,
          personalInfo,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        await axios.put(
          `${import.meta.env.VITE_SERVER}/api/infos/contact`,
          contactInfo,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        await alert("profile updated successfully");
      } catch (error) {
        alert(error.response.data.error);
      }
    },
  },
});
