<template>
  <v-btn
      color="accent"
      v-bind="$attrs"
  >
    {{ buttonName }}
  </v-btn>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    buttonName: String,
  },
};
</script>
