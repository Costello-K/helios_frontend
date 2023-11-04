<template>
  <CardList
      :title="$t('titles.quizResults')"
      :data="quizResults"
  >
    <template v-slot:default="{ item }">
      <QuizResultCard :quiz-result="item"/>
    </template>
  </CardList>
  <PaginationComponent
      :totalPages="totalPages"
      :updatePage="handlePageChange"
  />
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { quizzesApi } from '@/api';
import CardList from '@/components/CardList';
import QuizResultCard from '@/components/QuizResultCard';
import PaginationComponent from '@/components/PaginationComponent';

export default {
  name: 'QuizResultsListPage',
  components: {
    CardList,
    QuizResultCard,
    PaginationComponent,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const totalPages = ref(1);
    const quizResults = computed(() => store.state.quizResultsList.quizResults);

    const getQuizzes = async (page) => {
      try {
        const { id } = router.currentRoute.value.params;
        const {
          data: {
            total_pages,
            results,
          },
        } = await quizzesApi.getListUserQuizResults(id, {page});

        totalPages.value = total_pages;
        return results;
      } catch (err) {
        console.error(err);
      }
    };

    const handlePageChange = async (newPage) => {
      const newQuizResultsData = await getQuizzes(newPage);
      store.commit('quizResultsList/setQuizResultsListData', newQuizResultsData);
    };

    onMounted(async () => {
      const newQuizResultsData = await getQuizzes(1);
      store.commit('quizResultsList/setQuizResultsListData', newQuizResultsData);
    });

    return { quizResults, totalPages, handlePageChange }
  },
};
</script>
