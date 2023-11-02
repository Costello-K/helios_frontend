<template>
  <router-link
      :to="to"
      v-bind="$attrs"
      class="btn btn--primary base-router-link"
  >
    {{ text }}
  </router-link>
</template>

<script>
export default {
  name: 'BaseLink',
  props: {
    text: String,
    to: {
      type:  [String, Object],
      required: true,
    },
  },
};
</script>

<style scoped>
.base-router-link {
  text-decoration: none;
  color: #198ae3;
}
</style>
