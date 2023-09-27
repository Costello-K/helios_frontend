<template>
  <v-container>
    <h1 class="display-2 mb-5">Company Profile</h1>
    <v-card class="text-left elevation-0">
      <InfoLine label="Company" :value="company?.name"/>
      <InfoLine label="Owner" :value="company?.owner"/>
    </v-card>
  </v-container>
</template>

<script>
import data from '@/data.json';
import InfoLine from "@/components/InfoLine";

export default {
  name: 'CompanyProfilePage',
  components: {
    InfoLine,
  },
  data() {
    return {
      company: null,
    };
  },
  created() {
    const companyId = parseInt(this.$route.params.id);
    this.company = data.companies[companyId - 1];
  },
};
</script>
