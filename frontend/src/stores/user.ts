import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, 
    isAuthenticated: false
  }),
  actions: {
    setUser(userData: any) {
      this.user = userData;
      this.isAuthenticated = !!userData;
    },
    clearUser() {
      this.user = null;
      this.isAuthenticated = false;
    },
  }
});

