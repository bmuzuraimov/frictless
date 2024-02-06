import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userId: '',
    name: '',
    picture: '',
    locale: '',
    email: '',
    is_ios_connected: false,
    is_notion_connected: false,
    notion_page_url: '',
    isAuthenticated: false
  }),
  actions: {
    setUser(userData: any) {
      this.userId = userData.userId;
      this.name = userData.name;
      this.picture = userData.picture;
      this.locale = userData.locale;
      this.email = userData.email;
      this.is_ios_connected = userData.is_ios_connected;
      this.is_notion_connected = userData.is_notion_connected;
      this.notion_page_url = userData.notion_page_url;
      this.isAuthenticated = true;
    },
    getUser(){
      return {
        userId: this.userId,
        name: this.name,
        picture: this.picture,
        locale: this.locale,
        email: this.email,
        is_ios_connected: this.is_ios_connected,
        is_notion_connected: this.is_notion_connected,
        notion_page_url: this.notion_page_url,
        isAuthenticated: this.isAuthenticated
      }
    },
    clearUser() {
      this.userId = '';
      this.name = '';
      this.picture = '';
      this.locale = '';
      this.email = '';
      this.is_ios_connected = false;
      this.is_notion_connected = false;
      this.notion_page_url = '';
      this.isAuthenticated = false;
    },
  }
});

