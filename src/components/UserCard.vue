<template>
  <v-card class="card-hover pa-2 px-4 h-100">
    <div class="d-flex justify-space-between h-100">
      <v-avatar
          class="align-self-center mx-3 my-1"
          size="70"
      >
        <v-img
            :src="`${BASE_URL}${user.avatar}`"
            :cover="true"
        />
      </v-avatar>
      <div class="align-self-center w-100">
        <BaseLink
            :to="`/users/${user.id}`"
            :text="`${user.first_name} ${user.last_name}`"
        />
        <CardInfoLine
            :label="$t('fields.email')"
            :value="user.email"
            class="py-2"
        />
      </div>
      <div
          v-if="isCompanyRoute && user.id !== authUserId"
          class="align-self-center"
      >
        <CardModalWindow
            v-if="!user.is_company_member && !user.is_active_invitation"
            :mainButtonText="'buttons.invite'"
            :mainText="'texts.confirmSendInvite'"
            :onClickFunction="sendInvite"
        />
        <CardModalWindow
            v-if="user.is_company_member"
            :mainButtonText="'buttons.removeFromCompany'"
            :mainText="'texts.confirmRemoveFromCompany'"
            :onClickFunction="removeUserFromCompany"
        />
        <CardModalWindow
            v-if="user.is_company_member && !user.is_company_admin"
            :mainButtonText="'buttons.appointAdmin'"
            :mainText="'texts.confirmAppointAdmin'"
            :onClickFunction="appointAdmin"
            class="mt-3"
        />
        <CardModalWindow
            v-if="user.is_company_admin"
            :mainButtonText="'buttons.removeAdmin'"
            :mainText="'texts.confirmRemoveAdmin'"
            :onClickFunction="removeAdmin"
            class="mt-3"
        />
      </div>
    </div>
  </v-card>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { invitationsApi, companiesApi } from '@/api';
import { BASE_URL } from '@/constants';
import BaseLink from '@/components/BaseLink';
import CardInfoLine from '@/components/CardInfoLine';
import CardModalWindow from '@/components/CardModalWindow';

export default {
  name: 'UserCard',
  components: {
    BaseLink,
    CardInfoLine,
    CardModalWindow,
  },
  props: {
    user: Object,
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { id } = router.currentRoute.value.params;
    const isCompanyRoute = router.currentRoute.value.path.includes('companies');
    const authUserId = computed(()=> store.getters['authUser/getUserId']);

    const updateUser = async (apiMethod, mutationType) => {
      try {
        const { status } = await apiMethod();
        if ([200, 201, 204].includes(status)) {
          store.commit(`userList/${mutationType}`, props.user.id);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const sendInvite = async () => {
      await updateUser(
          () => invitationsApi.sendInvitation(id, props.user.id),
          'updateSendInvitationInUserListData',
      );
    };

    const removeUserFromCompany = async () => {
      await updateUser(
          () => companiesApi.removeMember(id, props.user.id),
          'updateRemoveMemberInUserListData',
      );
    };

    const appointAdmin = async () => {
      await updateUser(
          () => companiesApi.appointAdmin(id, props.user.id),
          'updateAppointAdminInUserListData',
      );
    };

    const removeAdmin = async () => {
      await updateUser(
          () => companiesApi.removeAdmin(id, props.user.id),
          'updateRemoveAdminInUserListData',
      );
    };

    return {
      isCompanyRoute,
      authUserId,
      invitationsApi,
      sendInvite,
      removeUserFromCompany,
      appointAdmin,
      removeAdmin,
      BASE_URL,
    };
  },
}
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
