<template>
  <v-sheet
      width="400"
      class="mx-auto"
  >
    <h2 class="mb-5 text-center">
      {{ $t('titles.company') }}
    </h2>
    <v-form @submit.prevent="submitCompanyForm">
      <v-text-field
          v-model="formData.name"
          :label="$t('placeholders.name')"
          :rules="VALIDATION_RULES.name"
          :error-messages="errors.name"
      />
      <v-textarea
          v-model="formData.description"
          :label="$t('placeholders.description')"
          :rules="VALIDATION_RULES.description"
          :error-messages="errors.description"
      />
      <v-checkbox
          v-model="formData.visibility"
          :label="$t('placeholders.visibility')"
      />
      <BaseButton
          type="submit"
          class="w-100"
          :button-name="is_edit ? $t('buttons.edit') : $t('buttons.create')"
      />
    </v-form>
  </v-sheet>
</template>

<script>
import { ref  } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router/dist/vue-router';
import { companiesApi } from '@/api';
import { formUtils, objUtils } from '@/utils';
import { VALIDATION_RULES } from '@/constants';
import BaseButton from '@/components/BaseButton';

export default {
  name: 'CreateCompanyForm',
  components: {
    BaseButton,
  },
  props: {
    closeModalWindow: {
      type: Function,
      require: true,
    },
    is_edit: {
      type: Boolean,
      require: false,
    },
    data: {
      type: Object,
      require: false,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const myProfile = ref(false);
    const userData = ref({});
    const infoFields = ref([]);
    const formData = ref({
      name: '',
      description: '',
      visibility: true,
    });
    const errors = ref({
      name: '',
      description: '',
    });

    if (props.is_edit && props.data) {
      formData.value = objUtils.mergeObjects(formData.value, props.data);
    }

    const submitCompanyForm = async () => {
      const isFormValid = formUtils.formValidator(formData, ref(VALIDATION_RULES));
      if (!isFormValid) {
        return;
      }

      try {
        if (props.is_edit) {
          const { id } = router.currentRoute.value.params;
          const { data } = await companiesApi.updateCompany(id, formData.value);
          store.commit('company/setCompanyData', data);
        } else {
          const { data } = await companiesApi.createCompany(formData.value);
          store.commit('companyList/addCompany', data);
        }
        props.closeModalWindow()
      } catch (err) {
        errors.value = objUtils.createEmptyObject(errors.value);
        errors.value = objUtils.mergeObjects(errors.value, err.response.data);
      }
    };

    return {
      myProfile,
      userData,
      infoFields,
      formData,
      errors,
      VALIDATION_RULES,
      submitCompanyForm,
    }
  }
};
</script>
