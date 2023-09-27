<template>
  <v-card-text>
    <strong>
      {{ label }}:
    </strong>
    {{ value }}
  </v-card-text>
</template>

<script>
export default {
  name: 'CardInfoLine',
  props: {
    label: String,
    value: String,
  },
};
</script>
