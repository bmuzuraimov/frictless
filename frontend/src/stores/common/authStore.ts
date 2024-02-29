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
        const data = await authService.login(credentials)
        this.token = data.token
        localStorage.setItem('token', this.token)
        this.status = 'success'
        // take user to /overview route
        window.location.href = '/overview'
      } catch (error) {
        this.status = 'error'
        localStorage.removeItem('token')
        throw error
      }
    },
    async register(credentials: any) {
      try {
        this.status = 'loading'
        const data = await authService.register(credentials)
        this.token = data.token
        localStorage.setItem('token', this.token)
        this.status = 'success'
      } catch (error) {
        this.status = 'error'
        localStorage.removeItem('token')
        throw error
      }
    },
    logout() {
      this.token = ''
      this.status = ''
      localStorage.removeItem('token')
    }
  }
})
