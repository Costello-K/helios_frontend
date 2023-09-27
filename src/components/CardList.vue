<template>
  <v-container>
    <h1 class="mb-10">{{ title }}</h1>
    <v-row>
      <v-col
          v-for="item in data"
          :key="item?.id"
          cols="7"
          class="mx-auto"
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
