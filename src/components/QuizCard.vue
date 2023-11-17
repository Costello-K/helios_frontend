<template>
  <v-card class="card-hover pa-2 px-4 h-100">
    <div class="d-flex justify-space-between h-100">
      <div class="align-self-center w-100">
        <BaseLink
            v-if="!isUsersRout && (isOwner || quiz.company.is_admin)"
            :to="{
              path: `/companies/${quiz.company.id}/quizzes/${quiz.id}`,
              query: { preview: true }
            }"
            :text="`${quiz.title}`"
        />
        <CardInfoLine
            v-else
            :label="$t('fields.title')"
            :value="quiz.title"
            class="py-2"
        />
        <CardInfoLine
            v-if="isUsersRout"
            :label="$t('fields.company')"
            :value="quiz.company.name"
            class="py-2"
        />
        <CardInfoLine
            :label="$t('fields.description')"
            :value="(quiz.description).length > 200 ? `${quiz.description.slice(150)}...` : quiz.description"
            class="py-2"
        />
        <CardInfoLine
            :label="$t('fields.frequency')"
            :value="quiz.frequency || $t('texts.withoutLimitation')"
            class="py-2"
        />
        <template v-if="isUsersRout">
          <CardInfoLine
              v-if="isQuizResult"
              :label="$t(`${isQuizResult.completed ? 'fields.completeTime' : 'fields.startTime'}`)"
              :value="$filters.formatTime(lastUpdated)"
              class="py-2"
          />
          <CardInfoLine
              v-else
              :label="$t('fields.status')"
              :value="$t('texts.notStarted')"
              class="py-2"
          />
        </template>
      </div>
      <div
          v-if="isOwner || quiz.company.is_member"
          class="align-self-center"
      >
        <CardModalWindow
            :mainButtonText="isQuizResult && !isQuizResult.completed ? 'buttons.continue' : 'buttons.start'"
            :mainText="'texts.confirmStartQuiz'"
            :onClickFunction="() => $router.push({
              path: `/companies/${quiz.company.id}/quizzes/${quiz.id}`,
              query: { start: true }
            })"
        />
        <template v-if="!isUsersRout && (isOwner || quiz.company.is_admin)">
          <ModalWindow
              :open-button-text="$t('buttons.update')"
              :close-button-text="$t('buttons.cancel')"
              class="mt-3"
          >
            <template v-slot:default="{ closeModalWindow }">
              <QuizForm
                  :closeModalWindow="closeModalWindow"
                  :is-edit="true"
                  :data="quiz"
              />
            </template>
          </ModalWindow>
          <CardModalWindow
              :mainButtonText="'buttons.remove'"
              :mainText="'texts.confirmRemoveQuiz'"
              :onClickFunction="removeQuiz"
              class="mt-3"
          />
        </template>
      </div>
    </div>
  </v-card>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { quizzesApi } from '@/api';
import BaseLink from '@/components/BaseLink';
import CardInfoLine from '@/components/CardInfoLine';
import CardModalWindow from '@/components/CardModalWindow';
import ModalWindow from '@/components/ModalWindow';
import QuizForm from '@/components/QuizForm';

export default {
  name: 'UserCard',
  components: {
    QuizForm,
    BaseLink,
    CardInfoLine,
    CardModalWindow,
    ModalWindow,
  },
  props: {
    quiz: Object,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const { id } = router.currentRoute.value.params;
    const isQuizResult = ref(props.quiz.auth_user_last_completed);
    const isUsersRout = router.currentRoute.value.path.includes('users');
    const lastUpdated = computed(() => {
      if (isQuizResult.value) {
        return isQuizResult.value.completed ? isQuizResult.value.updated_at : isQuizResult.value.created_at;
      }
      return false;
    });
    const authUserId = computed(() => store.getters['authUser/getUserId']);
    const isOwner = props.quiz.company.owner.id === authUserId.value;

    const removeQuiz = async () => {
      try {
        const { status } = await quizzesApi.removeQuiz(id, props.quiz.id);
        if (status === 204) {
          store.commit('quizList/removeQuiz', props.quiz.id);
        }
      } catch (err) {
        console.error(err);
      }
    };

    return {
      isOwner,
      isQuizResult,
      lastUpdated,
      isUsersRout,
      authUserId,
      removeQuiz,
    };
  },
}
</script>

<style scoped>
.card-hover {
  min-width: 480px;
  min-height: 150px;
}
.card-hover:hover {
  transform: scale(1.03);
  transition: transform 0.2s ease-in-out;
}
</style>
