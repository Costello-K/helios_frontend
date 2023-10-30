<template>
  <CardList
      :title="title"
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
import { useI18n } from 'vue-i18n';
import { computed, onMounted, ref } from 'vue';
import { companiesApi, usersApi } from '@/api';
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
  props: {
    tab: {
      type: String,
      require: false,
    },
  },
  setup(props) {
    const { t } = useI18n({ useScope: 'global' });
    const router = useRouter();
    const store = useStore();
    const totalPages = ref(1);
    const title = ref('');
    const companies = computed(() => store.state.companyList.companies);
    const { id } = router.currentRoute.value.params;
    const tab = ref(props.tab);

    const companyRequests = {
      'all-companies': {
        request: async (page) => await companiesApi.getListCompanies(page),
        listTitle: 'titles.companies',
      },
      'my-companies': {
        request: async (page) => await companiesApi.getListCompanies(page, id),
        listTitle: 'titles.myCompanies',
      },
      'admins': {
        request: async (page) => await usersApi.getAdminCompaniesList(page),
        listTitle: 'titles.admins',
      },
      'members': {
        request: async (page) => await usersApi.getMemberCompaniesList(page),
        listTitle: 'titles.members',
      }
    };

    const getCompanies = async (page) => {
      try {
        if (!props.tab) {
          tab.value = 'all-companies';
        }
        const { data: { results, page_size, total_pages } } = await companyRequests[tab.value].request(page);
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
      title.value = t(companyRequests[tab.value].listTitle);
      store.commit('companyList/setCompanyListData', results);
      store.commit('companyList/setCompanyPageSize', page_size);
    });

    return { companies, title, totalPages, handlePageChange }
  },
};
</script>
