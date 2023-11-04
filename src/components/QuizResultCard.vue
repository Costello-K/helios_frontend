<template>
  <v-card class="card-hover pa-2 px-4 h-100">
    <div class="d-flex justify-space-between h-100">
      <div class="align-self-center w-100">
        <CardInfoLine
            :label="$t('fields.company')"
            :value="quizResult.company.name"
            class="py-1"
        />
        <CardInfoLine
          :label="$t('fields.quiz')"
          :value="quizResult.quiz.title"
          class="py-1"
      />
        <CardInfoLine
            v-for="(item, i) in USER_QUIZ_RESULT_TIME_FIELDS"
            :key="`${i}_${item.name}`"
            :label="$t(item.label)"
            :value="$filters.formatTime(quizResult[item.name])"
            class="py-0 text-left"
        />
        <CardInfoLine
            :label="$t('fields.quizTime')"
            :value="parserUtils.daytimeParser(quizResult.quiz_time)"
            class="py-0 text-left"
        />
        <CardInfoLine
            v-for="(item, i) in USER_QUIZ_RESULT_INFO_FIELDS"
            :key="`${i}_${item.name}`"
            :label="$t(item.label)"
            :value="quizResult[item.name]"
            class="py-0 text-left"
        />
      </div>
    </div>
  </v-card>
</template>

<script>
import { parserUtils } from '@/utils';
import { USER_QUIZ_RESULT_INFO_FIELDS, USER_QUIZ_RESULT_TIME_FIELDS } from '@/constants';
import CardInfoLine from '@/components/CardInfoLine';

export default {
  name: 'RequestCard',
  components: {
    CardInfoLine,
  },
  props: {
    quizResult: Object,
  },
  setup() {
    return {
      parserUtils,
      USER_QUIZ_RESULT_INFO_FIELDS,
      USER_QUIZ_RESULT_TIME_FIELDS,
    }
  }
};
</script>

<style scoped>
.card-hover {
  min-width: 480px;
  min-height: 100px;
}
.card-hover:hover {
  transform: scale(1.03);
  transition: transform 0.2s ease-in-out;
}
</style>
