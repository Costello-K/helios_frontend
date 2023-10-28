<template>
  <div class="text-center">
    <v-container v-if="totalPages > 1">
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
                v-model="page"
                class="my-4"
                :length="totalPages"
                @input="updatePage"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'PaginationComponent',
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    updatePage: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const page = ref(1);

    watch(page, (newPage, oldPage) => {
      if (newPage !== oldPage) {
        props.updatePage(newPage);
      }
    });

    return { page }
  },
};
</script>
