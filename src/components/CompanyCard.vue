<template>
  <v-card height="120" class="card-hover pa-5">
    <BaseLink :to="`/companies/${company?.id}`" :text="company?.name"/>
    <CardInfoLine :label="$t('fields.owner')" :value="company?.owner"/>
  </v-card>
</template>

<script>
import BaseLink from '@/components/BaseLink'
import CardInfoLine from '@/components/CardInfoLine'

export default {
  name: 'CompanyCard',
  components: {
    BaseLink,
    CardInfoLine,
  },
  props: {
    company: Object,
  },
};
</script>

<style scoped>
.card-hover:hover {
  transform: scale(1.03);
  transition: transform 0.2s ease-in-out;
}
</style>
