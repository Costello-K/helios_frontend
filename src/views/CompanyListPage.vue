<template>
  <CardList title="Company" :data=companies>
    <template v-slot:default="{ item }">
      <CompanyCard :company="item" />
    </template>
  </CardList>
</template>

<script>
import data from '@/data.json';
import CompanyCard from '@/components/CompanyCard';
import CardList from '@/components/CardList';

export default {
  name: 'CompanyListPage',
  data: () => ({
    companies: data.companies,
  }),
  components: {
    CardList,
    CompanyCard,
  },
};
</script>
