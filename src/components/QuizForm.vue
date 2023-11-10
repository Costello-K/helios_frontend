<template>
  <v-sheet
      width="600"
      class="mx-auto"
  >
    <h2 class="mb-5 text-center">
      {{ $t('titles.quiz') }}
    </h2>
    <v-form @submit.prevent="submitQuizForm">
      <v-text-field
          v-model="formData.title"
          :rules="VALIDATION_RULES.title"
          :error-messages="errors.title"
      />
      <v-text-field
          v-model="formData.description"
          :rules="VALIDATION_RULES.description"
          :error-messages="errors.description"
      />
      <v-text-field
          v-model="formData.frequency"
          :rules="VALIDATION_RULES.frequency"
          :error-messages="errors.frequency"
          type="number"
      />
      <v-row
          v-for="(question, questionIndex) in formData.questions"
          :key="questionIndex"
          :class="['question', { 'top-border': questionIndex === 0 }]"
      >
        <v-col cols="12">
          <v-textarea
              v-model="question.question_text"
              :rules="VALIDATION_RULES.question_text"
              :error-messages="errors?.questions?.[questionIndex].question_text"
              rows="3"
          />
          <v-row
              v-for="(answer, answerIndex) in question.answers"
              :key="answerIndex"
          >
            <v-col cols="8">
              <v-textarea
                  v-model="answer.text"
                  :rules="VALIDATION_RULES.text"
                  :error-messages="errors?.questions?.[questionIndex].answers?.[answerIndex].text"
                  rows="2"
              />
            </v-col>
            <v-col
                cols="4"
                class="align-self-center d-flex"
            >
              <v-checkbox
                  v-model="answer.is_right"
                  :label="$t('placeholders.right')"
              />
              <v-btn
                  @click="removeAnswer(questionIndex, answerIndex)"
                  class="mt-2"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <div class="d-flex justify-space-between mt-1">
            <v-btn @click="addAnswer(questionIndex)">
              {{ $t('buttons.addAnswer') }}
            </v-btn>
            <v-btn @click="removeQuestion(questionIndex)">
              {{ $t('buttons.removeQuestion') }}
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-btn
          @click="addQuestion"
          :block="true"
          class="mt-8"
      >
        {{ $t('buttons.addQuestion') }}
      </v-btn>

      <template v-if="commonErrors.length > 0">
        <v-card-text
            v-for="(item ,i) in commonErrors"
            :key="`${i}_${item}`"
            class="py-4 red"
        >
          {{ `${i}: ${item}` }}
        </v-card-text>
      </template>

      <BaseButton
          class="w-100 mt-10"
          :button-name="$t('buttons.uploadFromExcelFile')"
          @click="switchForm"
      />
      <v-form
          v-if="isOpenForm"
          @submit.prevent="submitUploadExcelForm"
          class="mt-7"
      >
        <div
            v-if="isFileErrors"
            class="my-2"
        >
          <v-card-text
              v-for="(error, key) in fileErrors"
              :key="`${key}_${error}`"
              class="py-0 red"
          >
              {{ `${error}` && `${key}: ${JSON.stringify(error)}` }}
          </v-card-text>
        </div>
        <v-file-input
            v-model="fileData.excelFile"
            :label="$t('placeholders.excelFile')"
            :rules="VALIDATION_RULES.excelFile"
            :error-messages="fileErrors.file"
            prepend-icon="mdi-file-excel"
            show-size
            accept=".xls, .xlsx"
        />
        <GroupFormButtons
            type="submit"
            :summit-button-name="isEdit ? $t('buttons.edit') : $t('buttons.create')"
            :cancel-button-click-function="switchForm"
        />
      </v-form>

      <BaseButton
          type="submit"
          class="w-100 mt-5"
          :button-name="isEdit ? $t('buttons.edit') : $t('buttons.create')"
      />
    </v-form>
  </v-sheet>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { quizzesApi } from '@/api';
import { formUtils, objUtils } from '@/utils';
import { MIN_COUNT_QUIZ_ANSWERS, MIN_COUNT_QUIZ_QUESTIONS, VALIDATION_RULES } from '@/constants';
import BaseButton from '@/components/BaseButton';
import GroupFormButtons from '@/components/GroupFormButtons';

export default {
  name: 'QuizForm',
  components: {
    BaseButton,
    GroupFormButtons,
  },
  props: {
    closeModalWindow: {
      type: Function,
      require: true,
    },
    isEdit: {
      type: Boolean,
      require: false,
    },
    data: {
      type: Object,
      require: false,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const isOpenForm = ref(false);
    const { id } = router.currentRoute.value.params;
    const { t } = useI18n({ useScope: 'global' });
    const errors = ref({});
    const commonErrors = ref([]);
    const fileData = ref({ excelFile: '' });
    const fileErrors = ref({
      file: '',
      title: '',
      description: '',
      questions: '',
    });
    const formData = ref({
      title: '',
      description: '',
      frequency: null,
      questions: [
        {
          id: null,
          question_text: '',
          answers: [
            { text: '', is_right: false },
            { text: '', is_right: false },
          ],
        }, {
          id: null,
          question_text: '',
          answers: [
            { text: '', is_right: false },
            { text: '', is_right: false },
          ],
        },
      ],
    });
    const addQuestion = () => {
      formData.value.questions.push({
        id: null,
        questionText: '',
        answers: [
          { text: '', is_right: false },
          { text: '', is_right: false },
        ],
      });
    };
    const isFileErrors = computed(() => Object.values(fileErrors).some(error => error !== ''));

    const removeQuestion = index => formData.value.questions.splice(index, 1);
    const addAnswer = questionIndex => {
      formData.value.questions[questionIndex].answers.push({text: '', is_right: false});
    };
    const removeAnswer = (questionIndex, answerIndex) => {
      formData.value.questions[questionIndex].answers.splice(answerIndex, 1);
    };
    const switchForm = () => isOpenForm.value = !isOpenForm.value;

    const commonValidation = formData => {
      if (formData.questions.length < MIN_COUNT_QUIZ_QUESTIONS) {
        commonErrors.value.push(`${t('validations.minCountQuestions')} ${MIN_COUNT_QUIZ_QUESTIONS}
          ${t('validations.questions')}`);
      }

      formData.questions.forEach((question, i) => {
        if (question.answers.length < MIN_COUNT_QUIZ_ANSWERS) {
          commonErrors.value.push(`${t('validations.question')} №${i}. ${t('validations.minCountAnswers')}
            ${MIN_COUNT_QUIZ_ANSWERS} ${t('validations.answers')}`);
        }
      });

      formData.questions.forEach((question, i) => {
        const hasRightAnswer = question.answers.some(answer => answer.is_right);

        if (!hasRightAnswer) {
          commonErrors.value.push(`${t('validations.question')} №${i}. ${t('validations.rightAnswerRequired')}`);
        }
      });
    };

    onMounted(async () => {
      if (props.isEdit && props.data) {
        const {
          data: {
            title,
            description,
            frequency,
            questions,
          },
        } = await quizzesApi.getQuiz(id, props.data.id);

        Object.assign(formData.value, { title, description, frequency });
        if (questions) {
          formData.value.questions = questions.map(({ id, question_text, answers }) => ({
            id,
            question_text,
            answers: answers.map(({ text, is_right }) => ({ text, is_right })),
          }));
        }
      }
    });

    const submitUploadExcelForm = async () => {
      const isFormValid = formUtils.formValidator(fileData, ref(VALIDATION_RULES));

      if (isFormValid && fileData.value.excelFile && fileData.value.excelFile[0]) {
        const newFormData = new FormData();
        newFormData.append('file', fileData.value.excelFile[0]);

        try {
          const { data, status } = props?.isEdit
              ? await quizzesApi.updateQuiz(id, props.data.id, newFormData, 'file')
              : await quizzesApi.createQuiz(id, newFormData, 'file')

          if (status === 200) {
            store.commit(`quizList/updateQuizListData`, data);
          } else if (status === 201) {
            store.commit(`quizList/addQuizList`, data.quizzes);
          }

          props.closeModalWindow();
        } catch (err) {
          fileErrors.value = objUtils.createEmptyObject(fileErrors.value);
          fileErrors.value = objUtils.mergeObjects(fileErrors.value, err.response.data);
        }
      }
    };

    const submitQuizForm = async () => {
      commonErrors.value = [];
      errors.value = {};

      const { title, description, frequency, questions } = formData.value;
      const newFormData = {
        title,
        description,
        frequency,
        questions: questions.map(({ id, question_text, answers }) => {
          const filteredQuestion = {
            question_text,
            answers: answers.map(({ text, is_right }) => ({ text, is_right })),
          };
          if (id) {
            filteredQuestion.id = id;
          }

          return filteredQuestion;
        }),
      };

      commonValidation(newFormData);
      const isFormValid = formUtils.nestedFormValidator(newFormData, VALIDATION_RULES);
      if (commonErrors.value.length > 0 || !isFormValid) {
        return;
      }

      try {
        const { data, status } = props?.isEdit
            ? await quizzesApi.updateQuiz(id, props.data.id, newFormData)
            : await quizzesApi.createQuiz(id, newFormData)

        if (status === 200) {
          store.commit(`quizList/updateQuizListData`, data);
        } else if (status === 201) {
          store.commit(`quizList/addQuizList`, data);
        }

        props.closeModalWindow();
      } catch (err) {
        if (err.response.data.questions.length < 2) {
          commonErrors.value.push(err.response.data.questions);
          errors.value.title = err.response.data?.title;
          errors.value.description = err.response.data?.description;
        } else {
          errors.value = err.response.data;
        }
        console.error(err);
      }
    };

    return {
      errors,
      fileErrors,
      isFileErrors,
      commonErrors,
      isOpenForm,
      fileData,
      formData,
      VALIDATION_RULES,
      addQuestion,
      removeQuestion,
      addAnswer,
      removeAnswer,
      submitQuizForm,
      switchForm,
      submitUploadExcelForm,
    };
  },
};
</script>
<style>
.question {
  border-bottom: 10px solid #ededed;
  padding: 10px 0;
}
.top-border {
  border-top: 10px solid #ededed;
  margin-top: 20px;
  padding-top: 30px;
}
.red {
  color: #b02828;
}
</style>
