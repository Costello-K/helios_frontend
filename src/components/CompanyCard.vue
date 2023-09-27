<template>
  <v-card height="120" class="card-hover pa-5">
    <router-link
        :to="'/companies/' + company?.id"
        style="text-decoration: none; color: #198ae3;"
    >
      {{ company?.name }}
    </router-link>
    <v-card-text>
      <p>
        <strong>Owner:</strong>
        {{ company?.owner }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CompanyCard',
  props: {
    company: Object
  },
};
</script>

<style scoped>
.card-hover:hover {
  transform: scale(1.03);
  transition: transform 0.2s ease-in-out;
}
</style>
