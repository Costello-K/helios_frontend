<template>
  <v-card-title>
    {{ label }}:
    <strong>
      {{ value }}
    </strong>
  </v-card-title>
</template>

<script>
export default {
  name: 'InfoLine',
  props: {
    label: String,
    value: String,
  },
};
</script>
