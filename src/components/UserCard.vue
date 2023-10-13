<template>
  <v-card
      v-if="userData"
      :height=120
      class="card-hover d-flex align-center pa-5"
  >
    <v-avatar
        class="mx-3 my-1"
        size="70"
    >
      <v-img
        :src="`${BASE_URL}${userData.avatar}`"
        :cover="true"
      />
    </v-avatar>
    <div class="px-5">
      <BaseLink
        :to="`/users/${userData.id}`"
        :text="`${userData.first_name} ${userData.last_name}`"
      />
      <CardInfoLine
        :label="$t('fields.email')"
        :value="userData.email"
      />
    </div>
  </v-card>
</template>

<script>
import { ref } from 'vue';
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
    user: Object
  },
  setup(props) {
    const userData = ref(props.user);

    return { userData, BASE_URL };
  },
}
</script>

<style scoped>
.card-hover:hover {
  transform: scale(1.03);
  transition: transform 0.2s ease-in-out;
}
</style>