import { defineStore } from "pinia";
import axios from "axios";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profileInfo: {},
  }),
  getters: {
    getProfileInfo: (state) => state.profileInfo,
    getFirstName: (state) => state.profileInfo.firstName,
    getMax: (state) => state.max,
  },
  actions: {
    async fetch() {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        this.profileInfo = {};
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/infos/personal`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        this.profileInfo = res.data.response;
        setTimeout(function () {
          localStorage.removeItem("accessToken");
          alert("session timeout");
        }, 60000);
      } catch (error) {
        console.log(error.response.data.error);
        localStorage.removeItem("accessToken");
      }
    },
  },
});
