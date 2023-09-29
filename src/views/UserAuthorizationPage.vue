<template>
  <v-sheet width="350" class="mx-auto mt-15">
    <v-form @submit.prevent>
      <v-text-field
          :label="$t('placeholders.username')"
          :rules="usernameRules"
      ></v-text-field>

      <v-text-field
          :label="$t('placeholders.password')"
          :rules="passwordNRules"
          type="password"
      ></v-text-field>

      <BaseButton
          type="submit"
          class="mt-2"
          block
          :button-name="$t('buttons.login')"
      />
    </v-form>
  </v-sheet>
</template>

<script>
import { useI18n } from "vue-i18n/dist/vue-i18n";
import { ref } from "vue";
import BaseButton from "@/components/BaseButton";

export default {
  name: "UserAuthorizationPage",
  components: {
    BaseButton,
  },
  setup() {
    const { t } = useI18n({ useScope: "global" });

    const usernameRules = ref([val => !!val || t('validations.usernameRequired')]);
    const passwordNRules = ref([val => !!val || t('validations.passwordRequired')]);

    return { t, usernameRules, passwordNRules };
  },
};
</script>
