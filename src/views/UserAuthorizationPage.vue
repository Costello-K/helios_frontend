<template>
  <div v-show="!isLoadingPage">
    <v-sheet
        width="350"
        class="mx-auto mt-15"
    >
      <v-form @submit.prevent="submitUserLoginForm">
        <v-text-field
            v-model="formData.username"
            :label="$t('placeholders.username')"
            :rules="usernameRules"
        />

        <v-text-field
            v-model="formData.password"
            :label="$t('placeholders.password')"
            :rules="passwordRules"
            type="password"
        />

        <div style="position: relative" >
          <p class="login-error">
            {{ errors.detail }}
          </p>
        </div>

        <BaseButton
            type="submit"
            class="mt-5 w-100"
            :button-name="$t('buttons.login')"
        />
      </v-form>
      <p class="mt-4">
        <BaseLink
            to="/auth/users/reset/password"
            :text="$t('links.forgotYourPassword')"
        />
      </p>
      <p class="mt-4">
        <BaseLink
            to="/auth/users/reset/username"
            :text="$t('links.forgotYourUsername')"
        />
      </p>
      <SocialLogin/>
    </v-sheet>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n/dist/vue-i18n';
import { ref } from 'vue';
import { authUserApi, usersApi } from '@/api';
import { auth, objUtils } from '@/utils';
import { TYPE_SOCIAL_AUTH, VALIDATION_RULES } from '@/constants';
import BaseButton from '@/components/BaseButton';
import BaseLink from '@/components/BaseLink';
import SocialLogin from '@/components/SocialLogin';

export default {
  name: 'UserAuthorizationPage',
  components: {
    SocialLogin,
    BaseButton,
    BaseLink,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const store = useStore();
    const router = useRouter();
    const isLoadingPage = ref(localStorage.getItem(TYPE_SOCIAL_AUTH));
    const formData = ref({
      username: '',
      password: '',
    });
    const errors = ref({ detail: '' });

    const usernameRules = ref(VALIDATION_RULES.username);
    const passwordRules = ref(VALIDATION_RULES.password);

    const isFormValid = () => {
      return (
          usernameRules.value.every(rule => rule(formData.value.username) === true) &&
          passwordRules.value.every(rule => rule(formData.value.password) === true)
      )
    };

    const submitUserLoginForm = async () => {
      errors.value = objUtils.createEmptyObject(errors.value);

      if (!isFormValid()) {
        return;
      }

      try {
        const response = await authUserApi.jwtCreate(formData.value);
        auth.setTokens(response.data);

        const res = await usersApi.getMyUser();
        store.commit('authUser/setUserData', res.data);

        router.push(`/users/${res.data.id}`);
      } catch (err) {
        errors.value = objUtils.mergeObjects(errors.value, err.response.data);
      }
    };

    return {
      t,
      usernameRules,
      passwordRules,
      formData,
      errors,
      isLoadingPage,
      submitUserLoginForm,
    };
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
