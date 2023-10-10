import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import i18n from './i18n';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEdit, faTrash, faCamera } from '@fortawesome/free-solid-svg-icons';

library.add(faEdit, faTrash, faCamera);
loadFonts();

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(vuetify)
  .use(router)
  .use(i18n)
  .use(store)
  .mount('#app');
