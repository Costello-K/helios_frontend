<template>
  <v-card>
    <v-toolbar color="#ededed">
      <v-toolbar-title>
        {{ myProfile ? $t('titles.myProfile') : $t('titles.userProfile') }}
      </v-toolbar-title>
    </v-toolbar>
    <div class="d-flex flex-row">
      <v-tabs
          v-if="myProfile"
          v-model="tab"
          direction="vertical"
          color="primary"
      >
        <v-tab
            v-for="(item, i) in USER_NAVBAR"
            :key="`${i}_${item.value}`"
            :value="item.value"
        >
          <v-icon :start="true">
            {{ item.icon }}
          </v-icon>
          {{ $t(item.text) }}
          <div
              v-if="unviewedNotificationsCount && item.value === 'notifications'"
              :class="['notification-count', { 'small-height': unviewedNotificationsCount < 10 }]"
          >
            {{ unviewedNotificationsCount }}
          </div>
        </v-tab>
      </v-tabs>

      <div class="w-100">
        <div :class="['pa-5', { 'user-profile-container': tab !== 'my-companies' }]">
          <v-container class="d-flex">
            <v-img
                :src="`${BASE_URL}${userData.avatar}`"
                class="avatar"
            />
            <div class="text-user-info">
              <v-card className="text-left elevation-0">
                <InfoLine
                    v-for="(field, i) in infoFields"
                    :key="`${i}_${field.name}`"
                    :label="$t(field.label)"
                    :value="userData[field.name]"
                />
              </v-card>
            </div>
            <StarRatingComponent
                :rating="userData.rating"
                class="ml-auto"
            />
          </v-container>
          <ModalWindow
              v-if="myProfile && tab === 'my-companies'"
              :open-button-text="$t('buttons.createCompany')"
              :close-button-text="$t('buttons.cancel')"
          >
            <template v-slot:default="{ closeModalWindow }">
              <CompanyForm :closeModalWindow="closeModalWindow"/>
            </template>
          </ModalWindow>
        </div>

        <v-window
            v-if="myProfile"
            v-model="tab"
        >
          <v-window-item
              v-for="(item, i) in TYPES_COMPANY_LIST"
              :key="`${i}_${item}`"
              :value="item">
            <CompanyListPage
                v-if="tab === item"
                :tab="tab"
            />
          </v-window-item>
          <v-window-item value="invitations">
            <InvitationListPage v-if="tab === 'invitations'"/>
          </v-window-item>
          <v-window-item value="requests">
            <RequestListPage v-if="tab === 'requests'"/>
          </v-window-item>
          <v-window-item value="notifications">
            <NotificationListPage v-if="tab === 'notifications'"/>
          </v-window-item>
          <v-window-item value="user-quizzes">
            <QuizListPage
                v-if="tab === 'user-quizzes'"
                :tab="tab"
            />
          </v-window-item>
          <v-window-item value="user-quiz-results">
            <QuizResultsListPage v-if="tab === 'user-quiz-results'"/>
          </v-window-item>
          <v-window-item value="user-results-analytics">
            <AnalyticsPage
                v-if="tab === 'user-results-analytics'"
                :tab="tab"
            />
          </v-window-item>
        </v-window>
      </div>
    </div>
  </v-card>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { usersApi } from '@/api';
import { BASE_URL, COMPANY_NAVBAR, MY_USER_INFO_FIELDS, USER_INFO_FIELDS, USER_NAVBAR } from '@/constants';
import InfoLine from '@/components/InfoLine';
import CompanyListPage from '@/views/CompanyListPage';
import ModalWindow from '@/components/ModalWindow';
import CompanyForm from '@/components/CompanyForm';
import InvitationListPage from '@/views/InvitationListPage';
import RequestListPage from '@/views/RequestListPage';
import StarRatingComponent from '@/components/StarRatingComponent';
import QuizListPage from '@/views/QuizListPage';
import AnalyticsPage from '@/views/AnalyticsPage';
import QuizResultsListPage from '@/views/QuizResultsListPage';
import NotificationListPage from '@/views/NotificationListPage';

export default {
  name: 'UserProfilePage',
  components: {
    InfoLine,
    CompanyListPage,
    ModalWindow,
    CompanyForm,
    InvitationListPage,
    RequestListPage,
    StarRatingComponent,
    QuizListPage,
    QuizResultsListPage,
    AnalyticsPage,
    NotificationListPage,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const myProfile = ref(false);
    const showNotification = ref(false);
    const textNotification = ref('');
    const userData = ref({});
    const infoFields = ref([]);
    const tab = ref(COMPANY_NAVBAR[0].value);
    const TYPES_COMPANY_LIST = ['my-companies', 'all-companies', 'admins', 'members'];
    const authUserId = computed(()=> store.getters['authUser/getUserId']);
    const unviewedNotificationsCount = computed(() => {
      return store.getters['notificationList/getUnviewedNotificationCount'];
    });

    const getUserData = async (userId) => {
      try {
        const { data } = await usersApi.getUserProfile(userId);
        return data;
      } catch (err) {
        console.error(err);
      }
    };

    const getUsers = async (userId) => {
      myProfile.value = parseInt(userId) === authUserId.value;
      if (userId && myProfile.value) {
        infoFields.value = MY_USER_INFO_FIELDS;
        userData.value = store.state.authUser.user;
      } else if (userId) {
        infoFields.value = USER_INFO_FIELDS;
        userData.value = await getUserData(userId);
      }
    };

    onMounted(async () => {
      const { id } = router.currentRoute.value.params;
      await getUsers(id);
    });

    watch(() => router.currentRoute.value.params.id, async (newId) => {
      await getUsers(newId);
    });

    return {
      myProfile,
      userData,
      infoFields,
      tab,
      unviewedNotificationsCount,
      BASE_URL,
      USER_NAVBAR,
      TYPES_COMPANY_LIST,
      showNotification,
      textNotification,
    }
  }
};
</script>

<style scoped>
.user-profile-container {
  border-bottom: 2px solid grey;
  margin-bottom: 15px;
}
.avatar {
  min-width: 120px;
  max-width: 200px;
  max-height: 200px;
  width: auto;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
}
.text-user-info {
  padding-left: 30px;
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
