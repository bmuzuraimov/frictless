import './index.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueJwtDecode from 'vue-jwt-decode'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
const token = localStorage.getItem('token');

if (token) {
  app.config.globalProperties.$userDecoded = VueJwtDecode.decode(token);
} else {
  app.config.globalProperties.$userDecoded = {
    userId: '',
    name: '',
    picture: '',
    locale: '',
    email: '',
    is_ios_connected: false,
    is_notion_connected: false,
    notion_page_url: '',
    isAuthenticated: false
  };
}

app.use(createPinia());
app.use(vuetify);
app.use(router);
app.mount('#app');
