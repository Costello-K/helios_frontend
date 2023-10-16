<template>
  <v-container v-if="companyData">
    <h1 class="display-2 mb-5">
      {{ $t('titles.companyProfile') }}
    </h1>
    <v-card class="text-left elevation-0">
      <InfoLine
        v-for="(value, key) in COMPANY_INFO_FIELDS"
        :key="key"
        :label="$t(value.name)"
        :value="companyData[value.value]"
      />
    </v-card>
  </v-container>
</template>

<script>
import data from '@/data.json';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { COMPANY_INFO_FIELDS } from '@/constants';
import InfoLine from '@/components/InfoLine';

export default {
  name: 'CompanyProfilePage',
  components: {
    InfoLine,
  },
  setup() {
    const router = useRouter();
    const companyData = ref({});

    onMounted(() => {
      const { id } = router.currentRoute.value.params;
      companyData.value = data.companies[parseInt(id) - 1];
    });

    return { companyData, COMPANY_INFO_FIELDS }
  }
};
</script>
