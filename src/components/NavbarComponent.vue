<template>
  <div class="header">
    <v-container class="header-container pa-0">
      <v-toolbar
        color="transparent"
        title="HELIOS"
      >

        <v-toolbar-items>
          <div
            v-for="(item, i) in HEADER_NAVBAR_ITEMS"
            :key="i"
            class="h-100"
          >
            <v-btn
              v-if="item.auth && isAuthorized || !item.auth && !isAuthorized"
              @click="$router.push(`${item.path}`)"
            >
              {{ $t(item.title) }}
            </v-btn>
          </div>
        </v-toolbar-items>

        <v-card
          v-if="userEmail || userFirstName"
          class="elevation-0 text-center user-title mx-5 transparent"
        >
          <p>{{ userEmail }}</p>
          <p>{{ userFirstName }}</p>
        </v-card>

        <v-card class="elevation-0 transparent">
          <v-card-title>
            <v-menu>

              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  class="elevation-0 v-100"
                >
                  {{ locale }}
                </v-btn>
              </template>

              <v-list>
                <v-btn
                  v-for="(lang, i) in I18N_LANGUAGES"
                  :key="i"
                  :block="true"
                  @click="switchLang(lang.local)"
                  class="elevation-0"
                >
                  {{ lang.title }}
                </v-btn>
              </v-list>

            </v-menu>
          </v-card-title>
        </v-card>

        <v-card class="elevation-0 transparent">
          <v-card-title>
            <v-menu>

              <template v-slot:activator="{ props }">
                <v-app-bar-nav-icon v-bind="props"/>
              </template>

              <v-list>
                <div
                  v-for="(item, i) in HEADER_DROPDOWN_MENU_ITEMS"
                  :key="i"
                >
                  <v-btn
                    v-if="item.auth && isAuthorized || !item.auth && !isAuthorized"
                    @click="$router.push(item.path)"
                    class="elevation-0 w-100"
                  >
                    {{ $t(item.title) }}
                  </v-btn>
                </div>

                <v-btn
                  v-if="isAuthorized"
                  @click="myProfile"
                  class="elevation-0 w-100"
                >
                  {{ $t('buttons.myProfile') }}
                </v-btn>
                <v-btn
                  v-if="isAuthorized"
                  @click="logout"
                  class="elevation-0 w-100"
                >
                  {{ $t('buttons.logout') }}
                </v-btn>
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
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { auth } from '@/utils';
import { HEADER_NAVBAR_ITEMS, HEADER_DROPDOWN_MENU_ITEMS, I18N_LANGUAGES } from '@/constants';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const isAuthorized = computed(() => store.getters['authUser/isAuthorized']);
    const authUserId = computed(() => store.getters['authUser/getUserId']);
    const userFirstName = computed(() => store.getters['authUser/getUserFirstName']);
    const userEmail = computed(() => store.getters['authUser/getUserEmail']);
    const {t, locale} = useI18n({useScope: 'global'});

    const logout = () => {
      auth.logoutUser();
      router.push('/');
    };

    const myProfile = () => router.push(`/users/${authUserId.value}`);

    const switchLang = newLang => {
      locale.value = newLang;
      localStorage.setItem('currentLanguage', newLang);
    };

    return {
      t,
      locale,
      HEADER_NAVBAR_ITEMS,
      HEADER_DROPDOWN_MENU_ITEMS,
      I18N_LANGUAGES,
      userFirstName,
      userEmail,
      isAuthorized,
      authUserId,
      logout,
      myProfile,
      switchLang,
    };
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
.user-title {
  font-size: 12px;
}
.transparent {
  background-color: transparent;
}
</style>
