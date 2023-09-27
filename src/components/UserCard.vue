<template>
  <v-card height="120" class="card-hover pa-5">
    <router-link
        :to="'/users/' + user?.id"
        style="text-decoration: none; color: #198ae3;"
    >
      {{ user?.name }} {{ user?.lastname }}
    </router-link>

    <v-card-text>
      <p>
        <strong>Email:</strong>
        {{ user?.email }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'UserCard',
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
