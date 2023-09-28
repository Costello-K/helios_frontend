<template>
  <v-card height="120" class="card-hover pa-5">
    <BaseLink :to="`/users/${user?.id}`" :text="`${user?.name} ${user?.lastname}`"/>
    <CardInfoLine :label="$t('fields.email')" :value="user?.email"/>
  </v-card>
</template>

<script>
import BaseLink from '@/components/BaseLink';
import CardInfoLine from '@/components/CardInfoLine';

export default {
  name: 'UserCard',
  components: {
    BaseLink,
    CardInfoLine,
  },
  props: {
    user: Object
  },
};
</script>

<style scoped>
.card-hover:hover {
  transform: scale(1.03);
  transition: transform 0.2s ease-in-out;
}
</style>
