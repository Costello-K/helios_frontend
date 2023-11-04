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
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { formatDate } from '@/datetimeFilters';
import { quizzesApi } from '@/api';
import Chart from 'chart.js/auto';

export default {
  name: 'AnalyticsPage',
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
    const companyMembers = ref([
        {id: -1, username: 'All', first_name: '', last_name: ''},
    ]);
    const { id } = router.currentRoute.value.params;

    const quizResultsRequests = {
      'company-results-analytics': async () => await quizzesApi.allCompanyQuizResults(id),
      'user-results-analytics': async () => await quizzesApi.allUserQuizResults(id),
    };

    const getQuizResultsRequests = async () => {
      try {
        const {
          data: {
            quiz_results,
            members,
          },
        } = await quizResultsRequests[props.tab]();

        userQuizResults.value = quiz_results;
        if (members) {
          companyMembers.value.push(...members);
        }
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

    onMounted(async () => {
      await getQuizResultsRequests();
      createDiagram(userQuizResults.value);
    });

    return {
      chartCanvas,
      companyMembers,
      updateChart,
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
