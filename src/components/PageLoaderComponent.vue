<template>
  <v-overlay
      :model-value="true"
      class="align-center justify-center"
  >
    <v-progress-circular
        color="primary"
        indeterminate
        size="64"
    />
  </v-overlay>
</template>

<script>
export default {
  name: 'PageLoaderComponent',
}
</script>
