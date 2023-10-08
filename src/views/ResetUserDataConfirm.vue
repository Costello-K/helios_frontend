<template>
  <template v-if="!confirmResetProperty">
    <v-sheet
        width="350"
        class="mx-auto mt-15"
    >
      <v-form @submit.prevent="submitUserResetPropertyForm">
        <template v-if="property === 'password'">
          <v-text-field
            v-model="formData.new_password"
            :label="$t('placeholders.password')"
            :rules="passwordRules"
            type="password"
          />

          <v-text-field
            v-model="formData.re_new_password"
            :label="$t('placeholders.confirmPassword')"
            :rules="confirmPasswordRules"
            type="password"
          />
        </template>
        <template v-else>
          <v-text-field
            v-model="formData.new_username"
            :label="$t('placeholders.username')"
            :rules="usernameRules"
          />
        </template>
        <div style="position: relative" >
          <p class="login-error">
            {{ errors.detail }}
          </p>
        </div>

        <BaseButton
          :button-name="`${$t('buttons.applyNew')} ${$t(`buttons.${property}`)}`"
          class="mt-5 submit-button w-100"
          type="submit"
        />
      </v-form>
    </v-sheet>
  </template>
  <template v-else>
    <p>
      {{ `${$t(`texts.${property}`, 1)} ${$t('texts.hasBeenChanged')}` }}
    </p>
    <p>
      <BaseLink
          to="/authorization"
          :text="$t('links.clickHereToLogin')"
      />
    </p>
  </template>
</template>

<script>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n/dist/vue-i18n';
import { ref } from 'vue';
import { authApi } from '@/api';
import { objUtils } from '@/utils';
import BaseLink from '@/components/BaseLink';
import BaseButton from '@/components/BaseButton';
import { VALIDATION_RULES } from "@/constants";

export default {
  name: 'ConfirmActivationAccount',
  components: {
    BaseLink,
    BaseButton,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const confirmResetProperty = ref(false);
    const router = useRouter();
    const { property, uid, token } = router.currentRoute.value.params;
    const formData = ref({
      uid,
      token,
      new_password: '',
      re_new_password: '',
      new_username: '',
    });
    const errors = ref({ detail: '' });

    const usernameRules = ref(VALIDATION_RULES.username);
    const passwordRules = ref(VALIDATION_RULES.password);
    const confirmPasswordRules = ref([
          v => !!v || t('validations.passwordRequired'),
          v => v === formData.value.password || t('validations.passwordNotMatch')
        ]
    );

    const isFormValid = () => {
      if (property === 'password') {
        return (passwordRules.value.every(rule => rule(formData.value.new_password) === true) &&
          confirmPasswordRules.value.every(rule => rule(formData.value.re_new_password) === true))
      } else {
        return usernameRules.value.every(rule => rule(formData.value.new_username) === true)
      }
    };

    const submitUserResetPropertyForm = async () => {
      errors.value = objUtils.createEmptyObject(errors.value);

      if (!isFormValid()) {
        return;
      }

      try {
        const clearForm = objUtils.createObjectWithoutEmptyValues(formData.value);
        const res = await authApi.resetUserDataConfirm(clearForm, property);
        confirmResetProperty.value = res.status === 204;
      } catch (err) {
        const data = err.response.data;
        errors.value.detail = data.new_password && data.new_password[0] || data.new_username[0];
      }
    };

    return {
      t,
      property,
      confirmResetProperty,
      usernameRules,
      passwordRules,
      confirmPasswordRules,
      formData,
      errors,
      submitUserResetPropertyForm,
    }
  },
};
</script>

<style>
.login-error {
  width: 100%;
  color: #b02828;
  font-size: 0.75rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 0%);
}
</style>
