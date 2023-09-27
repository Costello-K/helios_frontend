<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="mt-15">
        <h1 class="display-1">404</h1>
        <h2 class="display-4">Page Not Found</h2>
        <p class="subheading-1 mt-5">Sorry, the requested page does not exist.</p>
        <router-link
            to="/"
            class="btn btn--primary"
            style="text-decoration: none; color: #198ae3;">
          Go Back to Home
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NotFoundPage',
};
</script>
