<template>
  <v-card
      v-if="request"
      class="card-hover pa-2 px-4 h-100"
  >
    <div class="d-flex justify-space-between h-100">
      <div class="align-self-center w-100">
        <CardInfoLine
            v-if="!isCompanyRoute"
            :label="$t('fields.company')"
            :value="request.company.name"
            class="py-2"
        />
        <CardInfoLine
            v-if="isCompanyRoute"
            :label="$t('fields.sender')"
            :value="`${request.sender.first_name} ${request.sender.last_name}`"
            class="py-2"
        />
        <CardInfoLine
            :label="$t('fields.status')"
            :value="request.status.toUpperCase()"
            class="py-2"
        />
      </div>
      <div
          v-if="is_pending_status"
          class="align-self-center"
      >
        <CardModalWindow
            v-if="!isCompanyRoute"
            :mainButtonText="'buttons.cancel'"
            :mainText="'texts.confirmRequestCancel'"
            :onClickFunction="cancelRequest"
        />
        <CardModalWindow
            v-if="isCompanyRoute"
            :mainButtonText="'buttons.approve'"
            :mainText="'texts.confirmRequestApprove'"
            :onClickFunction="approveRequest"
        />
        <CardModalWindow
            v-if="isCompanyRoute"
            :mainButtonText="'buttons.reject'"
            :mainText="'texts.confirmRequestReject'"
            :onClickFunction="rejectRequest"
            class="mt-3"
        />
      </div>
    </div>
  </v-card>
</template>

<script>
import { ref, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { requestsApi } from '@/api';
import { REQUEST_STATUS } from '@/constants';
import CardInfoLine from '@/components/CardInfoLine';
import CardModalWindow from '@/components/CardModalWindow';

export default {
  name: 'RequestCard',
  components: {
    CardInfoLine,
    CardModalWindow,
  },
  props: {
    request: Object,
  },
  setup(props) {
    const { request } = toRefs(props);
    const { id, sender } = request.value
    const store = useStore();
    const router = useRouter();
    const isCompanyRoute = router.currentRoute.value.path.includes('companies');
    const is_pending_status = ref(props.request.status.toUpperCase() === REQUEST_STATUS.pending);

    const updateRequest = async (request) => {
      try {
        const { data, status } = await request();
        if (status === 200) {
          store.commit('requestList/updateRequestListData', data);
          is_pending_status.value = false;
        }
      } catch (err) {
        console.error(err);
      }
    };

    const cancelRequest = async () => {
      await updateRequest(() => requestsApi.cancelRequest(id));
    };

    const approveRequest = async () => {
      await updateRequest(
          () => requestsApi.updateStatusOfRequest(sender.id, id, {confirm: true})
      );
    };

    const rejectRequest = async () => {
      await updateRequest(
          () => requestsApi.updateStatusOfRequest(sender.id, id, {confirm: false})
      );
    };

    return {
      isCompanyRoute,
      is_pending_status,
      cancelRequest,
      approveRequest,
      rejectRequest,
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
