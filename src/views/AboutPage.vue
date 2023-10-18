<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="display-2">{{ $t('titles.about') }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p
            class="body-1"
            v-for="item in [...Array(parseInt($t('texts.about.aboutArrayLength'))).keys()]"
            :key="item"
        >
          {{ $t(`texts.about.context[${item}]`) }}
        </p>
        <a
            href="mailto:contact@heloscompany.com"
            class="link"
        >
          contact@heloscompany.com
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AboutPage',
};
</script>
