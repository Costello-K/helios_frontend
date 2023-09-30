import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import i18n from './i18n';
import store from './store';

loadFonts();

createApp(App)
    .use(vuetify)
    .use(router)
    .use(i18n)
    .use(store)
    .mount('#app');
