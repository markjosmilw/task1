import { defineStore } from "pinia";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    profileInfos: [],
  }),
  getters: {
    getProfileInfos: (state) => state.profileInfos,
  },
  actions: {
    async fetch() {
      console.log("fetch ok");
    },
  },
});
