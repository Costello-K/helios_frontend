<template>
  <v-sheet width="400" class="mx-auto mt-15">
    <v-form @submit.prevent>
      <v-text-field
          :label="$t('placeholders.username')"
          :rules="usernameRules"
      />

      <v-text-field
          :label="$t('placeholders.firstName')"
          :rules="firstNameRules"
      />

      <v-text-field
          :label="$t('placeholders.lastName')"
      />

      <v-text-field
          :label="$t('placeholders.email')"
          :rules="emailRules"
      />

      <v-text-field
          :label="$t('placeholders.password')"
          type="password"
          :rules="passwordRules"
      />

      <v-text-field
          :label="$t('placeholders.confirmPassword')"
          type="password"
          :rules="passwordRules"
      />

      <BaseButton
          type="submit"
          class="mt-2"
          block
          :button-name="$t('buttons.registration')"
      />
    </v-form>
  </v-sheet>
</template>

<script>
import { useI18n } from "vue-i18n/dist/vue-i18n";
import { ref } from "vue";
import BaseButton from '@/components/BaseButton';

export default {
  name: 'UserRegistrationPage',
  components: {
    BaseButton,
  },
  setup() {
    const { t } = useI18n({useScope: 'global'});

    const usernameRules = ref([val => !!val || t('validations.usernameRequired')]);
    const firstNameRules = ref([val => !!val || t('validations.firstNameRequired')]);
    const passwordRules = ref([val => !!val || t('validations.passwordRequired')]);
    const emailRules = ref([
      val => !!val || t('validations.emailRequired'),
      val => /.+@.+\..+/.test(val) || t('validations.emailNotValid'),
    ])

    return { t, usernameRules, firstNameRules, emailRules, passwordRules };
  }
};
</script>
