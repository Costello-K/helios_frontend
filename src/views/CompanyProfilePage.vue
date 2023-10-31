<template>
  <v-card>
    <v-toolbar color="grey">
      <v-toolbar-title>
        {{ $t('titles.companyProfile') }}
      </v-toolbar-title>
    </v-toolbar>
    <div class="d-flex flex-row">
      <v-tabs
          v-if="is_owner"
          v-model="tab"
          direction="vertical"
          color="primary"
      >
        <v-tab
            v-for="(item, i) in COMPANY_NAVBAR"
            :key="i"
            :value="item.value"
        >
          <v-icon :start="true">
            {{ item.icon }}
          </v-icon>
          {{ $t(item.text) }}
        </v-tab>
      </v-tabs>
      <div class="w-100">
        <div class="pa-5">
          <v-container v-if="companyData">
            <v-card class="text-left elevation-0">
              <InfoLine
                  v-for="(value, key) in COMPANY_INFO_FIELDS"
                  :key="key"
                  :label="$t(value.name)"
                  :value="companyData[value.value]"
              />
              <InfoLine
                  v-if="!is_owner"
                  :label="$t('fields.owner')"
                  :value="owner"
              />
              <InfoLine
                  v-else
                  :label="$t('fields.visibility')"
                  :value="companyData.visibility ? $t('fields.yes') : $t('fields.no')"
              />
            </v-card>
          </v-container>
          <template v-if="is_owner">
            <div class="button-right">
              <ModalWindow
                  :open-button-text="$t('buttons.edit')"
                  :close-button-text="$t('buttons.cancel')"
              >
                <template v-slot:default="{ closeModalWindow }">
                  <CompanyForm
                      :closeModalWindow="closeModalWindow"
                      :is-edit="true"
                      :data="companyData"
                  />
                </template>
              </ModalWindow>

              <ModalWindow
                  :open-button-text="$t('buttons.delete')"
                  :close-button-text="$t('buttons.cancel')"
                  class="ml-5"
              >
                <v-card-text class="mb-10">
                  {{ $t('texts.confirmCompanyDelete') }}
                </v-card-text>
                <BaseButton
                    block
                    :button-name="$t('buttons.confirm')"
                    @click="deleteCompany"
                />
              </ModalWindow>
            </div>
          </template>
        </div>

        <v-window
            v-if="is_owner"
            v-model="tab"
        >
          <v-window-item
              v-for="(item, i) in ['all-users', 'admins', 'members']"
              :key="i"
              :value="item">
            <UserListPage
                v-if="tab === item"
                :tab="tab"
            />
          </v-window-item>
          <v-window-item value="quizzes">
            <QuizListPage v-if="tab === 'quizzes'"/>
          </v-window-item>
          <v-window-item value="invitations">
            <InvitationListPage v-if="tab === 'invitations'"/>
          </v-window-item>
          <v-window-item value="requests">
            <RequestListPage v-if="tab === 'requests'"/>
          </v-window-item>
        </v-window>
      </div>
    </div>
  </v-card>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { companiesApi } from '@/api';
import { COMPANY_INFO_FIELDS, COMPANY_NAVBAR } from '@/constants';
import InfoLine from '@/components/InfoLine';
import BaseButton from '@/components/BaseButton';
import ModalWindow from '@/components/ModalWindow';
import CompanyForm from '@/components/CompanyForm';
import UserListPage from '@/views/UserListPage';
import RequestListPage from '@/views/RequestListPage';
import InvitationListPage from '@/views/InvitationListPage';
import QuizListPage from '@/views/QuizListPage';

export default {
  name: 'CompanyProfilePage',
  components: {
    UserListPage,
    InfoLine,
    BaseButton,
    ModalWindow,
    CompanyForm,
    RequestListPage,
    InvitationListPage,
    QuizListPage,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const is_owner = ref(false);
    const owner = ref('');
    const tab = ref(COMPANY_NAVBAR[0].value);
    const companyData = computed(() => store.state.company.company);
    const authUserId = computed(()=> store.getters['authUser/getUserId']);

    const getOwnerName = ({first_name, last_name}) => `${first_name} ${last_name}`;

    const getCompanyData = async (companyId) => {
      try {
        const { data } = await companiesApi.getCompany(companyId);
        store.commit('company/setCompanyData', data);
        is_owner.value = data.owner.id === authUserId.value;
        owner.value = getOwnerName(data.owner);
      } catch (err) {
        console.error(err);
      }
    };

    onMounted(async () => {
      const { id } = router.currentRoute.value.params;
      await getCompanyData(id);
    });

    watch(() => router.currentRoute.value.params.id, async (newId, oldId) => {
      if (newId !== oldId) {
        await getCompanyData(newId);
      }
    });

    const deleteCompany = async () => {
      try {
        const { id } = router.currentRoute.value.params;
        const { status } = await companiesApi.removeCompany(id);
        if (status === 204) {
          router.push(`/users/${authUserId.value}`);
        }
      } catch (err) {
        console.error(err);
      }
    }

    return {
      companyData,
      is_owner,
      owner,
      tab,
      deleteCompany,
      COMPANY_INFO_FIELDS,
      COMPANY_NAVBAR,
    }
  }
};
</script>

<style scoped>
.button-right {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 20px;
  border-bottom: 2px solid grey;
}
</style>
