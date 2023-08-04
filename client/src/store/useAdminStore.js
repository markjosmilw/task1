const { defineStore } = require("pinia");

export const useAdminStore = defineStore({
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
