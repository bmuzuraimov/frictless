import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // To store user information
    isAuthenticated: false // To track authentication status
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

