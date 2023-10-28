<template>
  <v-container v-if="companyData">
    <h1 class="display-2 mb-5">
      {{ $t('titles.companyProfile') }}
    </h1>
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
              :is_edit="true"
              :data="companyData"
          />
        </template>
      </ModalWindow>

      <BaseButton
          :button-name="$t('buttons.delete')"
          @click="deleteCompany"
          class="ml-5"
      />
    </div>
  </template>
</template>


<script>
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { companiesApi } from '@/api';
import { COMPANY_INFO_FIELDS } from '@/constants';
import InfoLine from '@/components/InfoLine';
import BaseButton from '@/components/BaseButton';
import ModalWindow from '@/components/ModalWindow';
import CompanyForm from '@/components/CompanyForm';

export default {
  name: 'CompanyProfilePage',
  components: {
    InfoLine,
    BaseButton,
    ModalWindow,
    CompanyForm,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const companyData = computed(() => store.state.company.company);
    const is_owner = ref(false);
    const authUserId = computed(()=> store.getters['authUser/getUserId']);
    const owner = ref('');

    const getOwnerName = ({first_name, last_name}) => `${first_name} ${last_name}`;

    const getCompanyData = async (companyId) => {
      try {
        const { data } = await companiesApi.getCompany(companyId);
        store.commit('company/setCompanyData', data);
        is_owner.value = data.owner.id === authUserId.value
        owner.value = getOwnerName(data.owner)
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
      deleteCompany,
      COMPANY_INFO_FIELDS
    }
  }
};
</script>

<style scoped>
.button-right {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(30, 28, 28, 0.84);
}
</style>
