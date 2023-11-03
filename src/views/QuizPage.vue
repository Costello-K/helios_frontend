<template>
  <template v-if="messageLimit">
    <h3 class="mt-15 text-center">
      {{ messageLimit.replace(/\.\d+$/, "") }}
    </h3>
    <div class="mt-15">
      <BaseLink
          :to="`/companies/${$router.currentRoute.value.params.companyId}/`"
          :text="$t('links.returnToCompanyPage')"
          class="text-center"
      />
    </div>
  </template>

  <v-sheet
      v-if="loaded && (formData.company.is_admin || formData.company.owner.id === authUserId || start)"
      width="600"
      class="mx-auto"
  >
    <template v-if="!showQuizResults">
      <h2 class="mb-5 text-center">
        {{ $t('titles.quiz') }}
      </h2>
      <v-form @submit.prevent="submitQuizResultForm">
        <h3 class="mb-2">
          {{ formData.title }}
        </h3>
        <v-card-text>
          {{ formData.description }}
        </v-card-text>
        <CardInfoLine
            :label="$t('fields.frequency')"
            :value="formData.frequency || $t('texts.withoutLimitation')"
            class="py-2"
        />
        <v-row
            v-for="(question, questionIndex) in formData.questions"
            :key="`${questionIndex}_${question.id}`"
            :class="['question', { 'top-border': questionIndex === 0 }]"
        >
          <v-col
              cols="12"
              class="text-left"
          >
            <v-card-title>
              {{ question.question_text }}
            </v-card-title>
            <v-row
                v-for="(answer, answerIndex) in question.answers"
                :key="`${answerIndex}_${answer.text}`"
            >
              <v-col cols="9">
                <v-card-text>
                  {{ answer.text }}
                </v-card-text>
              </v-col>
              <v-col
                  cols="3"
                  class="align-self-center d-flex"
              >
                <v-checkbox
                    v-model="answer.is_right"
                    :label="$t('placeholders.right')"
                    :disabled="preview"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <BaseButton
            v-if="start"
            :button-name="$t('buttons.complete')"
            type="submit"
            class="w-100 mt-5"
        />
      </v-form>
    </template>

    <template v-else>
      <h2 class="mb-5 text-center">
        {{ $t('titles.quizResult') }}
      </h2>
      <CardInfoLine
          v-for="(item, i) in USER_QUIZ_RESULT_TIME_FIELDS"
          :key="`${i}_${item.name}`"
          :label="$t(item.label)"
          :value="$filters.formatTime(results[item.name])"
          class="py-2 text-left"
      />
      <CardInfoLine
          :label="$t('fields.quizTime')"
          :value="parserUtils.daytimeParser(results.quiz_time)"
          class="py-2 text-left"
      />
      <CardInfoLine
          v-for="(item, i) in USER_QUIZ_RESULT_INFO_FIELDS"
          :key="`${i}_${item.name}`"
          :label="$t(item.label)"
          :value="results[item.name]"
          class="py-2 text-left"
      />
      <div class="mt-15">
        <BaseLink
            :to="`/companies/${results.company.id}/`"
            :text="$t('links.returnToCompanyPage')"
            class="text-center"
        />
      </div>
    </template>
  </v-sheet>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { quizzesApi } from '@/api';
import { parserUtils } from '@/utils';
import { USER_QUIZ_RESULT_INFO_FIELDS, USER_QUIZ_RESULT_TIME_FIELDS } from '@/constants';
import BaseButton from '@/components/BaseButton';
import CardInfoLine from '@/components/CardInfoLine';
import BaseLink from '@/components/BaseLink';

export default {
  name: 'QuizPage',
  components: {
    BaseButton,
    CardInfoLine,
    BaseLink,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formData = ref({});
    const results = ref({});
    const messageLimit = ref('');
    const loaded = ref(false);
    const showQuizResults = ref(false);
    const { companyId, quizId } = router.currentRoute.value.params;
    const { preview, start } = router.currentRoute.value.query;
    const authUserId = computed(()=> store.getters['authUser/getUserId']);

    onMounted(async () => {
      try {
        const {
          data: {
            company,
            title,
            description,
            frequency,
            questions,
          },
        } = preview
            ? await quizzesApi.getQuiz(companyId, quizId)
            : await quizzesApi.startQuiz(companyId, quizId)

        Object.assign(formData.value, { company, title, description, frequency });
        if (questions) {
          formData.value.questions = questions.map(({id, question_text, answers}) => ({
            id,
            question_text,
            answers: answers.map(({text, is_right}) => ({
              text,
              is_right: is_right === null ? false : is_right
            })),
          }));
        }

        loaded.value = true;
      } catch (err) {
        if (err.response.status === 406) {
          messageLimit.value = err.response.data.message;
        } else {
          console.error(err);
        }
      }
    });

    const submitQuizResultForm = async () => {
      const newFormData = {
        questions: formData.value.questions.map(({ id, question_text, answers }) => ({
          id,
          question_text,
          answers: answers.map(({ text, is_right }) => ({ text, is_right })),
        })),
      };

      try {
        const { data, status } = await quizzesApi.completeQuiz(companyId, quizId, newFormData);
        if (status === 200) {
          results.value = data;
          showQuizResults.value = true;
        }
      } catch (err) {
        console.error(err);
      }
    };

    return {
      loaded,
      authUserId,
      preview,
      start,
      formData,
      results,
      messageLimit,
      showQuizResults,
      submitQuizResultForm,
      parserUtils,
      USER_QUIZ_RESULT_INFO_FIELDS,
      USER_QUIZ_RESULT_TIME_FIELDS,
    };
  },
};
</script>

<style scoped>
.question {
  border-bottom: 1px solid #ededed;
  padding: 10px 0;
}
.top-border {
  border-top: 1px solid #ededed;
  margin-top: 20px;
  padding-top: 30px;
}
</style>
