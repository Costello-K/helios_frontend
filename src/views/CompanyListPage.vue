<template>
  <CardList :title="$t('titles.companies')" :data=companies>
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
  components: {
    CardList,
    CompanyCard,
  },
  setup() {
    const companies = data.companies;

    return { companies }
  },
};
</script>
