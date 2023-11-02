<template>
  <CardList
      :title="$t('titles.invitations')"
      :data="invitations"
  >
    <template v-slot:default="{ item }">
      <InvitationCard :invitation="item"/>
    </template>
  </CardList>
  <PaginationComponent
      :totalPages="totalPages"
      :updatePage="handlePageChange"
  />
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router/dist/vue-router';
import { computed, onMounted, ref } from 'vue';
import { invitationsApi } from '@/api';
import CardList from '@/components/CardList';
import InvitationCard from '@/components/InvitationCard';
import PaginationComponent from '@/components/PaginationComponent';

export default {
  name: 'InvitationListPage',
  components: {
    CardList,
    PaginationComponent,
    InvitationCard,
  },
  setup() {
    const store = useStore();
    const totalPages = ref(1);
    const router = useRouter();
    const invitations = computed(() => store.state.invitationList.invitations);

    const getInvitations = async (page) => {
      try {
        const { id } = router.currentRoute.value.params;
        const isCompanyRoute = router.currentRoute.value.path.includes('companies');
        const {
          data: {
            total_pages,
            results,
          },
        } = isCompanyRoute
            ? await invitationsApi.getCompanyInvitationsList(id, page)
            : await invitationsApi.getMyInvitationsList(page)

        totalPages.value = total_pages;
        return results;
      } catch (err) {
        console.error(err);
      }
    };

    const handlePageChange = async (newPage) => {
      const newInvitationsData = await getInvitations(newPage);
      store.commit('invitationList/setInvitationListData', newInvitationsData);
    };

    onMounted(async () => {
      const newInvitationsData = await getInvitations(1);
      store.commit('invitationList/setInvitationListData', newInvitationsData);
    });

    return { invitations, totalPages, handlePageChange }
  },
};
</script>
