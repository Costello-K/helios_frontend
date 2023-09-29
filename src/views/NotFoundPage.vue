<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="mt-15">
        <h1 class="display-1">404</h1>
        <h2 class="display-4">{{ $t('titles.pageNotFound') }}</h2>
        <p class="subheading-1 mt-5">{{ $t('texts.notFound') }}</p>
        <BaseLink to="/" :text="$t('links.goHome')"/>
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
