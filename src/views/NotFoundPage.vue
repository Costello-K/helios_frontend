<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="mt-15">
        <h1 class="display-1">404</h1>
        <h2 class="display-4">Page Not Found</h2>
        <p class="subheading-1 mt-5">Sorry, the requested page does not exist.</p>
        <BaseLink to="/" text="Go Back to Home"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BaseLink from '@/components/BaseLink';

export default {
  name: 'NotFoundPage',
  components: {
    BaseLink,
  },
};
</script>
