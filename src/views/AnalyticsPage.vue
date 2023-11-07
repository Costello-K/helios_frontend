<template>
  <div class="container-analytics">
    <h2 class="mb-10">
      {{ $t('titles.analytics') }}
    </h2>
    <v-select
        v-if="companyMembers.length > 1"
        :label="$t('fields.companyMember')"
        :items="companyMembers"
        @update:modelValue="updateChart"
        item-title="username"
        item-value="id"
        variant="outlined"
    >
      <template v-slot:item="{ props, item }">
        <v-list-item
            v-bind="props"
            :subtitle="`${item.raw.id}_${item.raw.first_name}_${item.raw.last_name}`"
        />
      </template>
    </v-select>

    <canvas ref="chartCanvas" width="500" height="300"/>

    <v-container class="d-flex justify-space-between my-10">
      <div style="min-width: 300px">
        <template v-if="!isCompanyRoute">
          <v-select
              :label="$t('fields.company')"
              :items="userCompanies"
              v-model="selectCompany"
              item-title="name"
              item-value="id"
              variant="outlined"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item
                  v-bind="props"
                  :subtitle="`${item.raw.id}_${item.raw.description.slice(0, 20)}`"
              />
            </template>
          </v-select>
        </template>

        <template v-else>
          <v-select
              :label="$t('fields.companyMember')"
              :items="companyMembers"
              v-model="selectMember"
              item-title="username"
              item-value="id"
              variant="outlined"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item
                  v-bind="props"
                  :subtitle="`${item.raw.id}_${item.raw.first_name}_${item.raw.last_name}`"
              />
            </template>
          </v-select>
        </template>

        <v-select
            :label="$t('fields.companyQuiz')"
            :items="companyQuizzes"
            v-model="selectQuiz"
            item-title="title"
            item-value="id"
            variant="outlined"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
                v-bind="props"
                :subtitle="`${item.raw.id}_Company: ${item.raw.company.name}_${item.raw.description.slice(0, 10)}`"
            />
          </template>
        </v-select>

        <v-select
            :label="$t('fields.fileFormat')"
            :items="EXPORT_FILE_FORMAT"
            v-model="selectFormat"
            item-title="format"
            variant="outlined"
        />
      </div>

      <BaseButton
          :button-name="$t('buttons.export')"
          @click="exportFile"
          class="align-self-center"
      />
    </v-container>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { formatDate } from '@/datetimeFilters';
import { quizzesApi } from '@/api';
import Chart from 'chart.js/auto';
import { EXPORT_FILE_FORMAT } from '@/constants';
import BaseButton from '@/components/BaseButton';

export default {
  name: 'AnalyticsPage',
  components: {
    BaseButton,
  },
  props: {
    tab: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const chartCanvas = ref(null);
    const chartInstance = ref(null);
    const userQuizResults = ref([]);
    const selectMember = ref(null);
    const selectQuiz = ref(null);
    const selectCompany = ref(null);
    const exportData = ref(null);
    const selectFormat = ref(EXPORT_FILE_FORMAT[0].format);
    const companyMembers = ref([
      {id: -1, username: 'All', first_name: '', last_name: ''},
    ]);
    const companyQuizzes = ref([
      {id: -1, title: 'All', description: '', company: {name: 'All'}},
    ]);
    const userCompanies = ref([
      {id: -1, name: 'All', description: ''},
    ]);
    const { id } = router.currentRoute.value.params;
    const isCompanyRoute = router.currentRoute.value.path.includes('companies');

    const quizResultsRequests = {
      'company-results-analytics': async () => await quizzesApi.getTotalCompanyQuizResults(id),
      'user-results-analytics': async () => await quizzesApi.getTotalUserQuizResults(id),
    };
    const exportResults = {
      'company-results-analytics': async (params) => await quizzesApi.getCompanyUserQuizResults(id, params),
      'user-results-analytics': async (params) => await quizzesApi.getListUserQuizResults(id, params),
    };

    const getQuizResultsRequests = async () => {
      try {
        const {
          data: {
            quiz_results,
            members,
            quizzes,
            companies,
          },
        } = await quizResultsRequests[props.tab]();

        userQuizResults.value = quiz_results;
        companyMembers.value.push(...(members || []));
        companyQuizzes.value.push(...(quizzes || []));
        userCompanies.value.push(...(companies || []));
      } catch (err) {
        console.error(err);
      }
    };

    const extractChartData = (data, user_id='') => {
      const dataSets = {
        updatedData: [],
        userRatingData: [],
        companyAverageScore: [],
      };

      const filtered = user_id
          ? data.filter(result => result.participant === user_id)
          : [...data]

      filtered.forEach(result => {
        dataSets.updatedData.push(formatDate(result.updated_at));
        dataSets.userRatingData.push(parseFloat(result.user_rating));
        dataSets.companyAverageScore.push(parseFloat(result.company_average_score));
      });

      return Object.values(dataSets);
    };

    const createDiagram = (quizResultsData, user_id='') => {
      const [updatedData, userRatingData, companyAverageScore] = extractChartData(quizResultsData, user_id);

      if (chartInstance.value) {
        chartInstance.value.destroy();
      }

      const ctx = chartCanvas.value.getContext('2d');
      const data = {
        labels: updatedData,
        datasets: [{
          label: 'Average score',
          data: userRatingData,
          pointStyle: false,
          fill: true,
          borderWidth: 1,
        }, {
          label: 'Company average score',
          data: companyAverageScore,
          pointStyle: false,
          fill: true,
          borderWidth: 1,
        }],
      };
      const xScaleConfig = {
        ticks: {
          minRotation: 90,
        },
      };
      const yScaleConfig = {
        min: 0,
        max: 100,
      };
      const options = {
        scales: {
          x: xScaleConfig,
          y: yScaleConfig,
        },
      };
      const config = {
        type: 'line',
        data,
        options,
      };

      chartInstance.value = new Chart(ctx, config);
    };

    const updateChart = user_id => {
      if (user_id === -1) {
        createDiagram(userQuizResults.value);
      } else {
        createDiagram(userQuizResults.value, user_id);
      }
    };

    const getValidValue = value => (value === -1 || !value) ? '' : value;

    const exportFile = async () => {
      try {
        const { data } = await exportResults[props.tab]({
          page: 1,
          user_id: getValidValue(selectMember.value),
          quiz_id: getValidValue(selectQuiz.value),
          company_id: getValidValue(selectCompany.value),
          export_format: selectFormat.value,
        });

        exportData.value = data;
        if (selectFormat.value === 'json') {
          exportData.value = JSON.stringify(exportData.value);
        }
        const blob = new Blob([exportData.value], { type: 'application/octet-stream' });

        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `exported_file.${selectFormat.value}`;
        downloadLink.click();

        URL.revokeObjectURL(downloadLink.href);
      } catch (err) {
        console.error(err);
      }
    }

    onMounted(async () => {
      await getQuizResultsRequests();
      createDiagram(userQuizResults.value);
    });

    return {
      isCompanyRoute,
      chartCanvas,
      companyMembers,
      userCompanies,
      selectMember,
      selectQuiz,
      selectFormat,
      selectCompany,
      companyQuizzes,
      updateChart,
      exportFile,
      EXPORT_FILE_FORMAT,
    };
  },
};
</script>

<style scoped>
.container-analytics {
  max-width: 600px;
  margin: 0 auto 50px;
}
</style>
