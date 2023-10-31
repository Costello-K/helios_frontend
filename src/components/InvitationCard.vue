<template>
  <v-card
      v-if="invitation"
      class="card-hover pa-2 px-4 h-100"
  >
    <div class="d-flex justify-space-between h-100">
      <div class="align-self-center w-100">
        <CardInfoLine
            v-if="!isCompanyRoute"
            :label="$t('fields.company')"
            :value="invitation.company.name"
            class="py-2"
        />
        <CardInfoLine
            v-if="isCompanyRoute"
            :label="$t('fields.recipient')"
            :value="`${invitation.recipient.first_name} ${invitation.recipient.last_name}`"
            class="py-2"
        />
        <CardInfoLine
            :label="$t('fields.status')"
            :value="invitation.status.toUpperCase()"
            class="py-2"
        />
      </div>
      <div
          v-if="isPendingStatus"
          class="align-self-center"
      >
        <CardModalWindow
            v-if="isCompanyRoute"
            :mainButtonText="'buttons.revoke'"
            :mainText="'texts.confirmInvitationRevoke'"
            :onClickFunction="revokeInvitation"
        />
        <CardModalWindow
            v-if="!isCompanyRoute"
            :mainButtonText="'buttons.accept'"
            :mainText="'texts.confirmInvitationAccept'"
            :onClickFunction="acceptInvitation"
        />
        <CardModalWindow
            v-if="!isCompanyRoute"
            :mainButtonText="'buttons.decline'"
            :mainText="'texts.confirmInvitationDecline'"
            :onClickFunction="declineInvitation"
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
import { invitationsApi } from '@/api';
import { INVITATION_STATUS } from '@/constants';
import CardInfoLine from '@/components/CardInfoLine';
import CardModalWindow from '@/components/CardModalWindow';

export default {
  name: 'InvitationCard',
  components: {
    CardInfoLine,
    CardModalWindow,
  },
  props: {
    invitation: Object,
  },
  setup(props) {
    const { invitation } = toRefs(props);
    const { id, company } = invitation.value
    const store = useStore();
    const router = useRouter();
    const isCompanyRoute = router.currentRoute.value.path.includes('companies');
    const isPendingStatus = ref(props.invitation.status.toUpperCase() === INVITATION_STATUS.pending);

    const updateInvitation = async (request) => {
      try {
        const { data, status } = await request();
        if (status === 200) {
          store.commit('invitationList/updateInvitationListData', data);
          isPendingStatus.value = false;
        }
      } catch (err) {
        console.error(err);
      }
    };

    const revokeInvitation = async () => {
      await updateInvitation(() => invitationsApi.revokeInvitation(company.id, id));
    };

    const acceptInvitation = async () => {
      await updateInvitation(
          () => invitationsApi.updateStatusOfInvitation(company.id, id, {confirm: true})
      );
    };

    const declineInvitation = async () => {
      await updateInvitation(
          () => invitationsApi.updateStatusOfInvitation(company.id, id, {confirm: false})
      );
    };

    return {
      isCompanyRoute,
      isPendingStatus,
      revokeInvitation,
      acceptInvitation,
      declineInvitation,
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
