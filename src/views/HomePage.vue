<template>
  <v-img alt="logo" height="200" class="mt-10" src="@/assets/logo.png"></v-img>
  <h1 class='project-title'>HELIOS</h1>
  <h1>{{ $t('welcome') }}</h1>
  <!--  Server status will be used only for the FE-6 branch  -->
  <h1 :class="getStatusTextColor(data.status_code)">
    Server {{ data.result }}
  </h1>
  <h1 :class="getStatusTextColor(data.status_code)">
    Status code: {{ data.status_code }}
  </h1>
  <!--  Server status will be used only for the FE-6 branch  -->
</template>

<script>
import { testApiRequest } from "@/api";

export default {
  name: 'HomePage',
  async setup() {
    const data = await testApiRequest();
    const getStatusTextColor = statusCode => statusCode === 200 ? 'green-text' : 'red-text';

    return { data, getStatusTextColor };
  }
};
</script>

<style scoped>
.project-title {
  font-size: 42px;
  margin-top: 50px;
  margin-bottom: 50px;
}
.green-text {
  color: green;
}
.red-text {
  color: red;
}
</style>
