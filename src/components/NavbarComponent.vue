<template>
  <div class="header">
    <v-container class="header-container pa-0">
      <v-toolbar
        color="transparent"
        title="HELIOS"
      >

        <v-toolbar-items>
          <v-btn @click="$router.push('/')">
            {{ $t('navbar.home') }}
          </v-btn>

          <template v-if="isAuthorized">
            <v-btn
                v-for="(item, i) in HEADER_NAVBAR_AUTHORIZED_USER"
                :key="i"
                @click="$router.push(`${item.path}`)"
            >
              {{ $t(item.title) }}
            </v-btn>
          </template>

          <v-btn @click="$router.push('/about')">
            {{ $t('navbar.about') }}
          </v-btn>
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

              <v-list class="dropdown-menu-container">
                <template v-if="!isAuthorized">
                  <v-btn
                    v-for="(item, i) in HEADER_DROPDOWN_MENU_NON_AUTHORIZED_USER"
                    :key="i"
                    @click="$router.push(item.path)"
                    class="elevation-0 w-100"
                  >
                    {{ $t(item.title) }}
                  </v-btn>
                </template>

                <template v-if="isAuthorized">
                  <v-btn
                      v-for="(item, i) in HEADER_DROPDOWN_MENU_AUTHORIZED_USER"
                      :key="i"
                      @click="$router.push(item.path)"
                      class="elevation-0 w-100"
                  >
                    {{ $t(item.title) }}
                  </v-btn>
                  <v-btn
                      @click="$router.push(`/users/${authUserId}/notifications`)"
                      class="elevation-0 w-100"
                  >
                    {{ $t('buttons.notifications') }}
                    <div
                        v-if="unviewedNotificationsCount"
                        :class="['notification-count', { 'small-height': unviewedNotificationsCount < 10 }]"
                    >
                        {{ unviewedNotificationsCount }}
                    </div>
                  </v-btn>
                </template>

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

  <NotificationMessage/>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { auth } from '@/utils';
import {
  HEADER_NAVBAR_AUTHORIZED_USER,
  HEADER_DROPDOWN_MENU_AUTHORIZED_USER,
  HEADER_DROPDOWN_MENU_NON_AUTHORIZED_USER,
  I18N_LANGUAGES,
} from '@/constants';
import NotificationMessage from '@/components/NotificationMessage';

export default {
  name: 'NavbarComponent',
  components: {
    NotificationMessage,
  },
  setup() {
    const {t, locale} = useI18n({useScope: 'global'});
    const store = useStore();
    const router = useRouter();
    const isAuthorized = computed(() => store.getters['authUser/isAuthorized']);
    const authUserId = computed(() => store.getters['authUser/getUserId']);
    const userFirstName = computed(() => store.getters['authUser/getUserFirstName']);
    const userEmail = computed(() => store.getters['authUser/getUserEmail']);
    const unviewedNotificationsCount = computed(() => {
      return store.getters['notificationList/getUnviewedNotificationCount'];
    });

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
      HEADER_NAVBAR_AUTHORIZED_USER,
      HEADER_DROPDOWN_MENU_AUTHORIZED_USER,
      HEADER_DROPDOWN_MENU_NON_AUTHORIZED_USER,
      I18N_LANGUAGES,
      userFirstName,
      userEmail,
      isAuthorized,
      authUserId,
      unviewedNotificationsCount,
      logout,
      myProfile,
      switchLang,
    };
  }
};
</script>

<style scoped>
.header {
  background-color: rgba(168, 165, 165, 0.35);
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
.dropdown-menu-container {
  display: flex;
  flex-direction: column;
}
.notification-count {
  width: 25px;
  height: 25px;
  margin-left: 5px;
  color: white;
  text-align: center;
  line-height: 25px;
  background-color: #198ae3;
  border-radius: 50%
}
.notification-count.small-height {
  width: 17px;
  height: 17px;
  line-height: 17px;
}
</style>
