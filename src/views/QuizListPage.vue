<template>
  <CardList
      :title="$t('titles.quizzes')"
      :data="quizzes"
  >
    <template v-slot:default="{ item }">
      <QuizCard :quiz="item"/>
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
import QuizCard from '@/components/QuizCard';
import PaginationComponent from '@/components/PaginationComponent';

export default {
  name: 'QuizListPage',
  components: {
    CardList,
    QuizCard,
    PaginationComponent,
  },
  props: {
    tab: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const totalPages = ref(1);
    const { id } = router.currentRoute.value.params;
    const quizzes = computed(() => store.state.quizList.quizzes);

    const quizRequests = {
      'company-quizzes': async page => await quizzesApi.getListCompanyQuizzes(page, id),
      'user-quizzes': async page => await quizzesApi.getListUserQuizzes(page, id),
    };

    const getQuizzes = async (page) => {
      try {
        const {
          data: {
            total_pages,
            results,
          },
        } = await quizRequests[props.tab](page);

        totalPages.value = total_pages;
        return results;
      } catch (err) {
        console.error(err);
      }
    };

    const handlePageChange = async (newPage) => {
      const newQuizzesData = await getQuizzes(newPage);
      store.commit('quizList/setQuizListData', newQuizzesData);
    };

    onMounted(async () => {
      const newQuizzesData = await getQuizzes(1);
      store.commit('quizList/setQuizListData', newQuizzesData);
    });

    return { quizzes, totalPages, handlePageChange }
  },
};
</script>
