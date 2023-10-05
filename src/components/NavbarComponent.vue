<template>
  <div class="header">
    <v-container class="header-container pa-0">
      <v-toolbar color="transparent" title="HELIOS">

        <v-toolbar-items>
          <v-btn
              v-for="(item, i) in navbarItems"
              @click="$router.push(`${item.path}`)"
              :key="i"
          >
            {{ $t(`${item.title}`) }}
          </v-btn>

          <router-link to="/companies/:id"/>
          <router-link to="/users/:id"/>
        </v-toolbar-items>

        <v-card color="transparent" class="elevation-0">
          <v-card-title>
            <v-menu>

              <template v-slot:activator="{ props }">
                <v-btn :block="true" v-bind="props" class="elevation-0">{{ locale }}</v-btn>
              </template>

              <v-list>
                <v-list-item v-for="(lang, i) in language" :key="i">
                  <v-btn :block="true" class="elevation-0" @click="switchLang(lang.local)">{{ lang.title }}</v-btn>
                </v-list-item>
              </v-list>

            </v-menu>
          </v-card-title>
        </v-card>

        <v-card color="transparent" class="elevation-0">
          <v-card-title>
            <v-menu>

              <template v-slot:activator="{ props }">
                <v-app-bar-nav-icon v-bind="props"></v-app-bar-nav-icon>
              </template>

              <v-list>
                <v-list-item v-for="(item, i) in menuItems" :key="i">
                  <v-btn :block="true" class="elevation-0" @click="$router.push(item.path)">{{ $t(`${item.title}`) }}</v-btn>
                </v-list-item>
              </v-list>

            </v-menu>
          </v-card-title>
        </v-card>

      </v-toolbar>
    </v-container>
  </div>

  <v-container class="main pv-0">
    <Suspense>
      <router-view/>
    </Suspense>
  </v-container>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { HEADER_NAVBAR_ITEMS, HEADER_DROPDOWN_MENU_ITEMS, I18N_LANGUAGES } from '@/constants'

export default {
  setup() {
    const { t, locale } = useI18n({useScope: 'global'});
    const navbarItems = HEADER_NAVBAR_ITEMS;
    const menuItems = HEADER_DROPDOWN_MENU_ITEMS;
    const language = I18N_LANGUAGES;

    const switchLang = newLang => {
      locale.value = newLang;
      localStorage.setItem('currentLanguage', newLang);
    };

    return { t, locale, navbarItems, menuItems, language, switchLang };
  }
};
</script>

<style scoped>
.header {
  background-color: #ededed;
  width: 100%;
}
.header-container {
  min-width: 480px;
  max-width: 1200px;
  width: 100%;
}
.main {
  min-width: 480px;
  max-width: 1200px;
  text-align: center;
}
</style>
