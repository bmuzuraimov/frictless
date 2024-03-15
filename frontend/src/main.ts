import './index.css'

import { createApp } from 'vue';
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia';
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

app.use(createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
}));

app.use(createPinia());
app.use(vuetify);
app.use(router);
app.mount('#app');
