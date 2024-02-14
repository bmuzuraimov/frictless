import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      email: '',
      password: '',
      timezone: ''
    },
    isLoading: false,
    isSigningUp: false,
    showToast: false,
    toastMessage: '',
    toastType: ''
  }),
  actions: {
    async authenticate() {
      this.isLoading = true;
      const url = this.isSigningUp ? '/api/auth/sign-up' : '/api/auth/login';
      try {
        this.user.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const response = await axios.post(url, this.user);
        this.showToast = true;
        this.toastMessage = response.data.message;
        this.toastType = 'success';
        if (this.isSigningUp && response.data.success) {
          setTimeout(() => {
            window.location.href = '/confirm-code?email=' + this.user.email
          }, 1000);
        } else if (!this.isSigningUp && response.data.success) {
          localStorage.setItem('token', response.data.token);
          setTimeout(() => {
            window.location.href = '/overview';
          }, 1000);
        }
      } catch (error:any) {
        this.showToast = true;
        this.toastMessage = error.response && error.response.data ? error.response.data.message : 'An unexpected error occurred.';
        this.toastType = 'error';
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      } finally {
        this.isLoading = false;
      }
    },
    toggleSignup() {
      this.isSigningUp = !this.isSigningUp;
    }
  }
});
