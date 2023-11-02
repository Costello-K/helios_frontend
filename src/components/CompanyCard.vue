<template>
  <v-card
      v-if="company"
      class="card-hover pa-2 px-4 h-100"
  >
    <div class="d-flex justify-space-between h-100">
      <div class="align-self-center w-100">
        <BaseLink
            :to="`/companies/${company.id}`"
            :text="company.name"
        />
        <CardInfoLine
            :label="$t('fields.owner')"
            :value="`${company.owner.first_name} ${company.owner.last_name}`"
            class="py-2"
        />
        <CardInfoLine
            v-if="company.owner.id === authUserId"
            :label="$t('fields.visibility')"
            :value="company.visibility ? $t('fields.yes') : $t('fields.no')"
            class="py-2"
        />
      </div>
      <div
          v-if="!isCompanyRoute"
          class="align-self-center"
      >
        <CardModalWindow
            v-if="!company.is_member && !company.is_active_request && company.owner.id !== authUserId"
            :mainButtonText="'buttons.request'"
            :mainText="'texts.confirmSendRequest'"
            :onClickFunction="sendRequest"
        />
        <CardModalWindow
            v-if="company.is_member"
            :mainButtonText="'buttons.leave'"
            :mainText="'texts.confirmLeave'"
            :onClickFunction="leaveCompany"
        />
      </div>
    </div>
  </v-card>
</template>

<script>
import { useRouter } from 'vue-router/dist/vue-router';
import { useStore } from 'vuex';
import { computed, toRefs } from 'vue';
import { companiesApi, requestsApi } from '@/api';
import BaseLink from '@/components/BaseLink';
import CardInfoLine from '@/components/CardInfoLine';
import CardModalWindow from '@/components/CardModalWindow';

export default {
  name: 'CompanyCard',
  components: {
    BaseLink,
    CardInfoLine,
    CardModalWindow,
  },
  props: {
    company: Object,
  },
  setup(props) {
    const { company } = toRefs(props);
    const { id } = company.value;
    const router = useRouter();
    const store = useStore();
    const isCompanyRoute = router.currentRoute.value.path.includes('companies');
    const authUserId = computed(() => store.getters['authUser/getUserId']);

    const updateCompany = async (apiMethod, mutationType) => {
      try {
        const { status } = await apiMethod();
        if ([201, 204].includes(status)) {
          store.commit(`companyList/${mutationType}`, id);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const sendRequest = async () => {
      await updateCompany(
          () => requestsApi.sendRequest(id),
          'sendRequestToCompany',
      );
    };

    const leaveCompany = async () => {
      await updateCompany(
          () => companiesApi.removeMe(id),
          'leaveCompany',
      );
    };

    return {
      authUserId,
      isCompanyRoute,
      sendRequest,
      leaveCompany,
    }
  }
};
</script>

<style scoped>
.card-hover {
  min-width: 480px;
  min-height: 100px;
}
.card-hover:hover {
  transform: scale(1.03);
  transition: transform 0.2s ease-in-out;
}
</style>
