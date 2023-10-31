<template>
  <CardList
      :title="$t('titles.requests')"
      :data="requests"
  >
    <template v-slot:default="{ item }">
      <RequestCard :request="item"/>
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
import { requestsApi } from '@/api';
import CardList from '@/components/CardList';
import RequestCard from '@/components/RequestCard';
import PaginationComponent from '@/components/PaginationComponent';

export default {
  name: 'RequestListPage',
  components: {
    CardList,
    PaginationComponent,
    RequestCard,
  },
  setup() {
    const store = useStore();
    const totalPages = ref(1);
    const router = useRouter();
    const requests = computed(() => store.state.requestList.requests);

    const getRequests = async (page) => {
      try {
        const { id } = router.currentRoute.value.params;
        const isCompanyRoute = router.currentRoute.value.path.includes('companies');
        const {
          data: {
            total_pages,
            results,
          },
        } = isCompanyRoute
            ? await requestsApi.getCompanyRequestsList(id, page)
            : await requestsApi.getMyRequestsList(page)

        totalPages.value = total_pages;
        return results;
      } catch (err) {
        console.error(err);
      }
    };

    const handlePageChange = async (newPage) => {
      const newRequestsData = await getRequests(newPage);
      store.commit('requestList/setRequestListData', newRequestsData);
    };

    onMounted(async () => {
      const newRequestsData = await getRequests(1);
      store.commit('requestList/setRequestListData', newRequestsData);
    });

    return { requests, totalPages, handlePageChange }
  },
};
</script>
