<template>
  <template v-if="!activation">
    <p>{{ $t('texts.accountNotActivated') }}</p>
  </template>
  <template v-else>
    <p>{{ $t('texts.accountActivated') }}</p>
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
import { ref, onMounted } from 'vue';
import { authUserApi } from '@/api';
import BaseLink from '@/components/BaseLink';

export default {
  name: 'ConfirmActivationAccount',
  components: {
    BaseLink,
  },
  setup() {
    const activation = ref(false);
    const router = useRouter();
    const { uid, token } = router.currentRoute.value.params;
    const formData = {
      uid,
      token,
    };

    const sendActivationRequest = async () => {
      const res = await authUserApi.activationUserAccount(formData);
      activation.value = res.status === 204;
    };

    onMounted(async () => await sendActivationRequest());

    return { activation }
  },
};
</script>
