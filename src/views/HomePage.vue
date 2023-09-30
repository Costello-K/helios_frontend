<template>
  <v-img alt="logo" height="200" class="mt-10" src="@/assets/logo.png"></v-img>
  <h1 class='project-title'>HELIOS</h1>
  <h1>{{ $t('welcome') }}</h1>
<!--  TestCounter will be used only for the FE-5 branch  -->
  <TestCounter/>
</template>

<script>
import TestCounter from "@/components/TestCounter";

export default {
  name: 'HomePage',
  components: {
    TestCounter,
  }
};
</script>

<style scoped>
.project-title {
  font-size: 42px;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
