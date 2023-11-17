<template>
  <v-container class="list-wrapper">
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
.list-wrapper {
  max-width: 600px;
}
.container-list {
  min-width: 480px;
}
</style>
