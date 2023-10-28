<template>
  <CardList
      :title="$t('titles.companies')"
      :data="companies"
  >
    <template v-slot:default="{ item }">
      <CompanyCard :company="item" />
    </template>
  </CardList>
  <PaginationComponent
      :totalPages="totalPages"
      :updatePage="handlePageChange"
  />
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted, ref } from "vue";
import { companiesApi } from '@/api';
import CompanyCard from '@/components/CompanyCard';
import CardList from '@/components/CardList';
import PaginationComponent from '@/components/PaginationComponent';

export default {
  name: 'CompanyListPage',
  components: {
    CardList,
    CompanyCard,
    PaginationComponent,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const totalPages = ref(1);
    const companies = computed(() => store.state.companyList.companies);

    const getCompanies = async (page) => {
      try {
        const { id } = router.currentRoute.value.params;
        const { data: { total_pages, results, page_size } } = await companiesApi.getListCompanies(page, id);
        totalPages.value = total_pages;
        return { results, page_size };
      } catch (err) {
        console.error(err);
      }
    };

    const handlePageChange = async (newPage) => {
      const { results } = await getCompanies(newPage);
      store.commit('companyList/setCompanyListData', results);
    };

    onMounted(async () => {
      const { results, page_size } = await getCompanies(1);
      store.commit('companyList/setCompanyListData', results);
      store.commit('companyList/setCompanyPageSize', page_size);
    });

    return { companies, totalPages, handlePageChange }
  },
};
</script>
