<template>
  <v-container>
    <h1 class="display-2 mb-5">User Profile</h1>
    <v-card class="text-left elevation-0">
      <InfoLine label="First name" :value="user?.name"/>
      <InfoLine label="Last name" :value="user?.lastname"/>
      <InfoLine label="Email" :value="user?.email"/>
    </v-card>
  </v-container>
</template>

<script>
import data from '@/data.json';
import InfoLine from '@/components/InfoLine';

export default {
  name: 'UserProfilePage',
  components: {
    InfoLine,
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    const userId = parseInt(this.$route.params.id);
    this.user = data.users[userId - 1]
  },
};
</script>
