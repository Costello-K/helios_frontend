<template>
  <v-container>
    <h1 class="mb-5">
      {{ $t('titles.userSettings') }}
    </h1>
    <v-card
        max-width="480"
        class="elevation-0 mx-auto"
    >
      <div class="user-property-wrapper">
        <div class="user-property">
          <v-img
              :src="`${BASE_URL}${authUser.avatar}`"
              class="avatar"
          />
          <div class="property">
            <font-awesome-icon icon="fas fa-trash" @click="submitDeleteAvatarForm"/>
            <font-awesome-icon icon="fas fa-camera" @click="switchForm('isUpdateUserAvatar')"/>
          </div>
        </div>
        <v-form
            v-if="isOpenForm.isUpdateUserAvatar"
            @submit.prevent="submitUpdateUserAvatarForm"
        >
          <v-file-input
              v-model="avatarUpdateFormData.avatar"
              :label="$t('placeholders.avatar')"
              :rules="validationRules.avatar"
              :error-messages="errors.avatar"
              prepend-icon="mdi-camera"
              show-size
              accept=".png, .jpeg, .jpg"
          />
          <div class="button-right mt-2">
            <BaseButton
                :button-name="$t('buttons.cancel')"
                @click.prevent="switchForm('isUpdateUserAvatar')"
                class="mr-5"
            />
            <BaseButton
                type="submit"
                class="mb-5"
                :button-name="$t('buttons.saveProfile')"
            />
          </div>
        </v-form>
      </div>

      <div class="user-property-wrapper">
        <div class="user-property">
          <strong>{{ $t('placeholders.username') }}:</strong>
          <div class="property">
            {{ authUser.username || '-' }}
          </div>
        </div>
      </div>
      <div class="user-property-wrapper">
        <div class="user-property">
          <strong>{{ $t('placeholders.email') }}:</strong>
          <div class="property">
            {{ authUser.email || '-' }}
          </div>
        </div>
      </div>

      <div class="user-property-wrapper">
        <div class="user-property">
          <strong>{{ $t('fields.firstName') }}:</strong>
          <div class="property">
            {{ authUser.first_name || '-' }}
            <font-awesome-icon icon="fas fa-edit" @click="switchForm('isUpdateFirstName')"/>
          </div>
        </div>
        <v-form v-if="isOpenForm.isUpdateFirstName" @submit.prevent="submitUpdateUserFirstNameForm">
          <v-text-field
              :label="$t('placeholders.firstName')"
              v-model="userFirstNameUpdateFormData.first_name"
              :error-messages="errors.first_name"
          />
          <div class="button-right">
            <BaseButton
                type="submit"
                :button-name="$t('buttons.saveProfile')"
            />
          </div>
        </v-form>
      </div>

      <div class="user-property-wrapper">
        <div class="user-property">
          <strong>{{ $t('fields.lastName') }}:</strong>
          <div class="property">
            {{ authUser.last_name || '-' }}
            <font-awesome-icon icon="fas fa-edit" @click="switchForm('isUpdateLastName')"/>
          </div>
        </div>
        <v-form v-if="isOpenForm.isUpdateLastName" @submit.prevent="submitUpdateUserLastNameForm">
          <v-text-field
              :label="$t('placeholders.lastName')"
              v-model="userLastNameUpdateFormData.last_name"
              :error-messages="errors.last_name"
          />
          <div class="button-right">
            <BaseButton
                type="submit"
                :button-name="$t('buttons.saveProfile')"
            />
          </div>
        </v-form>
      </div>


      <div class="user-property-wrapper mt-10">
        <div class="user-property">
          <BaseButton
              :button-name="$t('buttons.changePassword')"
              @click="switchForm('isChangePassword')"
              class="mb-5 mx-auto"
          />
        </div>
        <v-form
            v-if="isOpenForm.isChangePassword"
            @submit.prevent="submitUpdateUserPasswordForm"
        >
          <v-text-field
              :label="$t('placeholders.currentPassword')"
              v-model="userPasswordUpdateFormData.current_password"
              :rules="validationRules.current_password"
              :error-messages="errors.current_password"
              type="password"
          />
          <v-text-field
              :label="$t('placeholders.newPassword')"
              v-model="userPasswordUpdateFormData.new_password"
              :rules="validationRules.new_password"
              :error-messages="errors.new_password"
              type="password"
          />
          <v-text-field
              :label="$t('placeholders.confirmNewPassword')"
              v-model="userPasswordUpdateFormData.re_new_password"
              :rules="validationRules.re_new_password"
              :error-messages="errors.re_new_password"
              type="password"
          />
          <div class="button-right">
            <BaseButton
              :button-name="$t('buttons.cancel')"
              @click.prevent="switchForm('isChangePassword')"
              class="mr-5"
            />
            <BaseButton
              :button-name="$t('buttons.apply')"
              type="submit"
            />
          </div>
        </v-form>
      </div>


      <div class="user-property-wrapper mt-10">
        <div class="user-property">
          <BaseButton
            :button-name="$t('buttons.deleteAccount')"
            @click="switchForm('isDeleteAccount')"
            class="mb-5 mx-auto"
          />
        </div>
        <v-form
            v-if="isOpenForm.isDeleteAccount"
            @submit.prevent="submitDeleteUserForm"
        >
          <v-text-field
              :label="$t('placeholders.currentPassword')"
              v-model="userDeleteFormData.current_password"
              :rules="validationRules.current_password"
              :error-messages="errors.current_password"
              type="password"
          />
          <div class="button-right">
            <BaseButton
                :button-name="$t('buttons.cancel')"
                @click.prevent="switchForm('isDeleteAccount')"
                class="mr-5"
            />
            <BaseButton
                type="submit"
                class="mb-5"
                :button-name="$t('buttons.confirmDeleteAccount')"
            />
          </div>
        </v-form>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { changeUserPassword, changeUserProfile, deleteMyUser, updateUserAvatar } from '@/api/users';
import { useI18n } from 'vue-i18n/dist/vue-i18n';
import { auth, objUtils } from '@/utils';
import { BASE_URL, VALIDATION_RULES } from '@/constants';
import BaseButton from '@/components/BaseButton';

export default {
  name: 'SettingsUserProfilePage',
  components: {
    BaseButton,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const router = useRouter();
    const store = useStore();
    const isOpenForm = ref({
      isUpdateUserAvatar: false,
      isUpdateFirstName: false,
      isUpdateLastName: false,
      isChangePassword: false,
      isDeleteAccount: false,
    });
    const authUser = computed(() => store.state.authUser.user);
    const avatarUpdateFormData = ref({ avatar: '' });
    const userFirstNameUpdateFormData = ref({ first_name: '' });
    const userLastNameUpdateFormData = ref({ last_name: '' });
    const userPasswordUpdateFormData = ref({
      current_password: '',
      new_password: '',
      re_new_password: '',
    });
    const userDeleteFormData = ref({ current_password: '' });
    const errors = ref({
      avatar: '',
      first_name: '',
      last_name: '',
      email: '',
      current_password: '',
      new_password: '',
      re_new_password: '',
    });

    const validationRules = ref({
      avatar: ref(VALIDATION_RULES.avatar),
      firstName: ref(VALIDATION_RULES.firstName),
      lastName: ref(VALIDATION_RULES.lastName),
      email: ref(VALIDATION_RULES.email),
      current_password: ref(VALIDATION_RULES.password),
      new_password: ref(VALIDATION_RULES.password),
      re_new_password: ref([
        v => !!v || t('validations.passwordRequired'),
        v => v === userPasswordUpdateFormData.value.new_password || t('validations.passwordNotMatch')
      ])
    });

    const switchForm = form => {
      isOpenForm.value[form] = !isOpenForm.value[form];
    };

    const formValidator = (form, rules) => {
      const copyForm = { ...form.value };
      const validationFormRules1 = { ...rules.value };

      for (const [key, value] of Object.entries(copyForm)) {
        if (!validationFormRules1[key].every(rule => rule(value) === true)) {
          return false;
        }
      }

      return true;
    };

    const submitUpdateUserAvatarForm = async () => {
      const isFormValid = formValidator(avatarUpdateFormData, validationRules)
      if (!isFormValid) {
        return;
      }

      const newFormData = new FormData();
      if (avatarUpdateFormData.value.avatar && avatarUpdateFormData.value.avatar[0]) {
        newFormData.append('avatar', avatarUpdateFormData.value.avatar[0]);
      }
      try {
        const res = await updateUserAvatar(newFormData);
        store.commit('authUser/setUserData', res.data);
        avatarUpdateFormData.value = objUtils.createEmptyObject(avatarUpdateFormData.value);
        switchForm('isUpdateUserAvatar');
      } catch (err) {
        errors.value = objUtils.createEmptyObject(errors.value);
        errors.value = objUtils.mergeObjects(errors.value, err.response.data);
      }
    };

    const submitDeleteAvatarForm = async () => {
      try {
        const res = await updateUserAvatar({ avatar: '' });
        store.commit('authUser/setUserData', res.data);
      } catch (err) {
        errors.value = objUtils.createEmptyObject(errors.value);
        errors.value = objUtils.mergeObjects(errors.value, err.response.data);
      }
    };

    const submitUpdateUserFirstNameForm = async () => {
      const isFormValid = formValidator(userFirstNameUpdateFormData, validationRules)
      if (!isFormValid) {
        return;
      }

      try {
        const res = await changeUserProfile(userFirstNameUpdateFormData.value);
        store.commit('authUser/setUserData', res.data);
        userFirstNameUpdateFormData.value = objUtils.createEmptyObject(userFirstNameUpdateFormData.value);
        switchForm('isUpdateFirstName');
      } catch (err) {
        errors.value = objUtils.createEmptyObject(errors.value);
        errors.value = objUtils.mergeObjects(errors.value, err.response.data);
      }
    };

    const submitUpdateUserLastNameForm = async () => {
      const isFormValid = formValidator(userLastNameUpdateFormData, validationRules)
      if (!isFormValid) {
        return;
      }

      try {
        const res = await changeUserProfile(userLastNameUpdateFormData.value);
        store.commit('authUser/setUserData', res.data);
        userLastNameUpdateFormData.value = objUtils.createEmptyObject(userLastNameUpdateFormData.value);
        switchForm('isUpdateLastName');
      } catch (err) {
        errors.value = objUtils.createEmptyObject(errors.value);
        errors.value = objUtils.mergeObjects(errors.value, err.response.data);
      }
    };

    const submitUpdateUserPasswordForm = async () => {
      const isFormValid = formValidator(userPasswordUpdateFormData, validationRules)
      if (!isFormValid) {
        return;
      }

      try {
        const res = await changeUserPassword(userPasswordUpdateFormData.value);
        if (res.status === 204) {
          console.log('Password change');
          userPasswordUpdateFormData.value = objUtils.createEmptyObject(userPasswordUpdateFormData.value);
          switchForm('isChangePassword');
        }

      } catch (err) {
        errors.value = objUtils.createEmptyObject(errors.value);
        errors.value = objUtils.mergeObjects(errors.value, err.response.data);
      }
    };

    const submitDeleteUserForm = async () => {
      const isFormValid = formValidator(userDeleteFormData, validationRules)
      if (!isFormValid) {
        return;
      }

      try {
        const res = await deleteMyUser(userDeleteFormData.value);
        if (res.status === 204) {
          console.log('Account Deleted');
          auth.logoutUser();
          router.push('/');
        }
      } catch (err) {
        errors.value = objUtils.createEmptyObject(errors.value);
        errors.value = objUtils.mergeObjects(errors.value, err.response.data);
      }
    };

    return {
      authUser,
      errors,
      validationRules,
      isOpenForm,
      avatarUpdateFormData,
      userFirstNameUpdateFormData,
      userLastNameUpdateFormData,
      userPasswordUpdateFormData,
      userDeleteFormData,
      switchForm,
      submitDeleteAvatarForm,
      submitUpdateUserAvatarForm,
      submitUpdateUserFirstNameForm,
      submitUpdateUserLastNameForm,
      submitUpdateUserPasswordForm,
      submitDeleteUserForm,
      BASE_URL,
    }
  }
};
</script>

<style scoped>
.avatar {
  max-width: 150px;
  max-height: 150px;
  width: auto;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
  margin-bottom: 15px;
}
.user-property-wrapper {
  margin-top: 20px;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
}
.user-property {
  display: flex;
  flex-direction: row;
}
.property {
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  margin-left: 40px;
  padding-bottom: 10px;
  align-items: center;
}
.button-right {
  display: flex;
  justify-content: flex-end;
  padding-right: 5px;
}
</style>
