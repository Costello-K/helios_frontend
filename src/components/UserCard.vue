<template>
  <v-card class="card-container d-flex align-center pa-5">
    <v-avatar
      class="mx-3 my-1"
      size="70"
    >
      <v-img
        :src="`${BASE_URL}${user.avatar}`"
        :cover="true"
      />
    </v-avatar>
    <div class="px-5">
      <BaseLink
        :to="`/users/${user.id}`"
        :text="`${user.first_name} ${user.last_name}`"
      />
      <CardInfoLine
        :label="$t('fields.email')"
        :value="user.email"
      />
    </div>
  </v-card>
</template>

<script>
import { BASE_URL } from '@/constants';
import BaseLink from '@/components/BaseLink';
import CardInfoLine from '@/components/CardInfoLine';

export default {
  name: 'UserCard',
  components: {
    BaseLink,
    CardInfoLine,
  },
  props: {
    user: Object,
  },
  setup() {
    return { BASE_URL };
  },
}
</script>

<style scoped>
.card-container {
  height: 120px;
}
.card-container:hover {
  transform: scale(1.03);
  transition: transform 0.2s ease-in-out;
}
</style>
