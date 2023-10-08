<template>
  <v-sheet
      width="400"
      class="mx-auto mt-15"
  >
    <template v-if="!registration.done">
      <v-form @submit.prevent="submitUserRegistrationForm">
        <v-file-input
          v-model="formData.avatar"
          :label="$t('placeholders.avatar')"
          :rules="validationRules.avatar"
          :error-messages="errors.avatar"
          prepend-icon="mdi-camera"
          show-size
          accept=".png, .jpeg, .jpg"
        />
        <v-text-field
          v-for="(value, key) in FIELDS_FORM_REGISTRATION"
          :key="key"
          v-model="formData[value.model]"
          :label="$t(value.label)"
          :rules="validationRules[key]"
          :error-messages="errors[value.model]"
          :type="value.type"
        />
        <BaseButton
          type="submit"
          class="w-100"
          :button-name="$t('buttons.registration')"
        />
      </v-form>

    </template>
    <template v-else>
      <p>{{ $t('texts.receiveAnEmail') }}</p>
      <p>
        {{ $t('texts.afterConfirmationActivation') }}
        <BaseLink
          to="/authorization"
          :text="$t('links.clickHereToLogin')"
        />
      </p>
    </template>
  </v-sheet>
</template>

<script>
import { useI18n } from 'vue-i18n/dist/vue-i18n';
import { ref } from 'vue';
import { authApi } from '@/api';
import { objUtils } from '@/utils';
import { FIELDS_FORM_REGISTRATION, VALIDATION_RULES } from '@/constants';
import BaseButton from '@/components/BaseButton';
import BaseLink from '@/components/BaseLink';

export default {
  name: 'UserRegistrationPage',
  components: {
    BaseButton,
    BaseLink,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const registration = ref({ done: false });
    const formData = ref({
      avatar: null,
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    });
    const errors = ref({
      avatar: '',
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    });

    const validationRules = ref({
      avatar: ref(VALIDATION_RULES.avatar),
      username: ref(VALIDATION_RULES.username),
      firstName: ref(VALIDATION_RULES.firstName),
      lastName: ref(VALIDATION_RULES.lastName),
      email: ref(VALIDATION_RULES.email),
      password: ref(VALIDATION_RULES.password),
      confirmPassword: ref([
        v => !!v || t('validations.passwordRequired'),
        v => v === formData.value.password || t('validations.passwordNotMatch')
      ])
    });

    const isFormValid = () => {
      for (const [key, value] of Object.entries(FIELDS_FORM_REGISTRATION)) {
        if (!validationRules.value[key].every(rule => rule(formData.value[value.model]) === true)) {
          return false;
        }
      }
      return true;
    };

    const createMultipartFormData = obj => {
      const newFormData = new FormData();
      for (const field in obj.value) {
        if (field !== 'avatar') {
          newFormData.append(field, obj.value[field]);
        } else if (field === 'avatar' && obj.value[field] && obj.value[field][0]) {
          newFormData.append(field, obj.value[field][0]);
        }
      }
      return newFormData
    }

    const submitUserRegistrationForm = async () => {
      if (!isFormValid()) {
        return;
      }

      try {
        const multipartFormData = createMultipartFormData(formData);
        const res = await authApi.registerUser(multipartFormData);
        registration.value.done = res.status === 201;
      } catch (err) {
        errors.value = objUtils.createEmptyObject(errors.value);
        errors.value = objUtils.mergeObjects(errors.value, err.response.data);
      }
    };

    return {
      t,
      FIELDS_FORM_REGISTRATION,
      validationRules,
      registration,
      formData,
      errors,
      submitUserRegistrationForm,
    };
  }
};
</script>

<style scoped>
.v-form > *:not(:last-child) {
  margin-bottom: 10px;
}
</style>
