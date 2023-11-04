<template>
  <v-container>
    <h2 class="mb-10">{{ title }}</h2>
    <v-row>
      <v-col
          v-for="item in data"
          :key="item.id"
          class="mx-auto container-list"
      >
        <slot :item="item"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CardList',
  props: {
    title: String,
    data: Array,
  },
};
</script>

<style scoped>
.container-list {
  min-width: 480px;
  max-width: 600px;
}
</style>
