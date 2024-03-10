import { defineStore } from 'pinia'
import authService from '@/services/authService'
import VueJwtDecode from 'vue-jwt-decode'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isRegister: false,
    token: localStorage.getItem('token') || '',
    status: ''
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    user: (state) => {
      try {
        return state.token ? VueJwtDecode.decode(state.token) : {
          userId: '',
          name: '',
          picture: '',
          ios_userId: '',
          locale: '',
          email: '',
          is_ios_connected: false,
          is_notion_connected: false,
          notion_page_url: '',
          scope: '',
          iat: 0,
          exp: 0
        };
      } catch (error) {
        console.error('Error decoding token:', error);
        return {
          userId: '',
          name: '',
          picture: '',
          ios_userId: '',
          locale: '',
          email: '',
          is_ios_connected: false,
          is_notion_connected: false,
          notion_page_url: '',
          scope: '',
          iat: 0,
          exp: 0
        };
      }
    },
  },

  actions: {
    async login(credentials: any) {
      try {
        this.status = 'loading'
        const response = await authService.login(credentials)
        if(response.data.success) {
          this.token = response.data.token
          localStorage.setItem('token', this.token)
          this.status = 'success'
          window.location.href = '/overview'
        }else{
          alert(response.data.message)
          this.status = 'error'
        }
      } catch (error) {
        this.status = 'error'
        localStorage.removeItem('token')
      }
    },
    async register(credentials: any) {
      try {
        this.status = 'loading'
        const response = await authService.register(credentials)
        if (response.data.success) {
          alert(response.data.message)
          this.status = 'success'
        } else {
          alert(response.data.message)
          this.status = 'error'
        }
      } catch (error) {
        this.status = 'error'
        localStorage.removeItem('token')
        throw error
      }
    },
    async confirm_email(form: any) {
      const response = await authService.confirm_email(form)
      return response.data
    },
    logout() {
      this.token = ''
      this.status = ''
      localStorage.removeItem('token')
      window.location.href = '/'
    },
    // miscalaneous functions
    async setReferral(ref: string) {
      localStorage.setItem('ref', ref)
      await authService.setReferral(ref);
    },
  }
})
